/**
 * End-to-end outreach engine tests against the real dev stack:
 *   docker compose up -d   (postgres on :5544, mailpit on :1025/:8025)
 *   TEST_DATABASE_URL migrated via `node scripts/migrate.mjs`
 *
 * Emails are really delivered over SMTP to mailpit and asserted via its API.
 */
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { loadOutreachConfig } from "@/lib/outreach/config";
import { SmtpEmailAdapter, type EmailPort } from "@/lib/outreach/email";
import * as repo from "@/lib/outreach/repo";
import { enrollContact } from "@/lib/outreach/scheduler";
import { tick } from "@/lib/outreach/sender";
import { resetOutreach, testSql } from "../helpers/db";
import {
  clearMailpit,
  getMailpitMessage,
  listMailpit,
  messagesFor,
  type MailpitSummary,
} from "../helpers/mailpit";

const sql = testSql();
const email = new SmtpEmailAdapter("localhost", 1025);
const config = loadOutreachConfig({
  NODE_ENV: "test",
  OUTREACH_MAIL_DRIVER: "smtp",
  OUTREACH_SMTP_HOST: "localhost",
  OUTREACH_SMTP_PORT: "1025",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  OUTREACH_SECRET: "test-secret",
} as NodeJS.ProcessEnv);

async function seedCampaign(
  delaysHours: number[],
  status: "draft" | "active" | "paused" | "archived" = "active",
): Promise<string> {
  const [{ id: campaignId }] = await sql<{ id: string }[]>`
    insert into outreach_campaigns (name, status) values ('Test campaign', ${status}) returning id
  `;
  for (let i = 0; i < delaysHours.length; i++) {
    const [{ id: templateId }] = await sql<{ id: string }[]>`
      insert into outreach_templates (name, subject, body_html, body_text)
      values (${`T${i}`}, ${`Subject ${i} for {{business}}`},
              ${`<p>Step ${i} hi {{firstName}}</p>`}, ${`Step ${i} hi {{firstName}}`})
      returning id
    `;
    await sql`
      insert into outreach_steps (campaign_id, step_index, template_id, delay_hours)
      values (${campaignId}, ${i}, ${templateId}, ${delaysHours[i]})
    `;
  }
  return campaignId!;
}

async function addContact(
  address: string,
  name: string,
  business: string,
): Promise<string> {
  const c = await repo.upsertContact(sql, {
    email: address,
    name,
    business_name: business,
    source: "manual",
  });
  return c.id;
}

/** Poll mailpit until at least `atLeast` messages exist for the address. */
async function waitForMail(
  address: string,
  atLeast: number,
  timeoutMs = 5_000,
): Promise<MailpitSummary[]> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const msgs = await messagesFor(address);
    if (msgs.length >= atLeast) return msgs;
    if (Date.now() > deadline) return msgs;
    await new Promise((r) => setTimeout(r, 100));
  }
}

beforeEach(async () => {
  await resetOutreach(sql);
  await clearMailpit();
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});

describe("outreach engine", () => {
  it("sends step 0 immediately, captures it, and is idempotent on re-tick", async () => {
    const campaignId = await seedCampaign([0, 24]);
    const contactId = await addContact("ana@example.com", "Ana Silva", "Garagem 33");
    await enrollContact(sql, campaignId, contactId);

    const r1 = await tick({ sql, email, config });
    expect(r1.sent).toBe(1);

    const msgs = await waitForMail("ana@example.com", 1);
    expect(msgs).toHaveLength(1);
    expect(msgs[0]!.Subject).toBe("Subject 0 for Garagem 33");

    const detail = await getMailpitMessage(msgs[0]!.ID);
    expect(detail.HTML).toContain("Ana");
    expect(detail.HTML).toContain("/api/outreach/unsubscribe");

    // The exact rendered body is stored on the send row (for the admin preview).
    const [send] = await sql<{ status: string; body_html: string; body_text: string }[]>`
      select status, body_html, body_text from outreach_sends where to_email = 'ana@example.com'
    `;
    expect(send!.status).toBe("sent");
    expect(send!.body_html).toContain("/api/outreach/unsubscribe");
    expect(send!.body_text).toContain("Ana");

    // Step 1 is due in 24h — a second tick sends nothing and never duplicates.
    const r2 = await tick({ sql, email, config });
    expect(r2.sent).toBe(0);
    expect(await messagesFor("ana@example.com")).toHaveLength(1);
  });

  it("advances through a multi-step sequence when steps are due", async () => {
    const campaignId = await seedCampaign([0, 0]);
    const contactId = await addContact("bob@example.com", "Bob B", "Cafe B");
    await enrollContact(sql, campaignId, contactId);

    await tick({ sql, email, config }); // step 0
    await tick({ sql, email, config }); // step 1 (scheduled at send-time, due now)

    expect(await waitForMail("bob@example.com", 2)).toHaveLength(2);
    const [enr] = await sql<{ status: string; current_step: number }[]>`
      select status, current_step from outreach_enrollments where contact_id = ${contactId}
    `;
    expect(enr!.status).toBe("completed");
    expect(enr!.current_step).toBe(1);
  });

  it("respects future delays and does not send the next step early", async () => {
    const campaignId = await seedCampaign([0, 48]);
    const contactId = await addContact("cara@example.com", "Cara", "Spa C");
    await enrollContact(sql, campaignId, contactId);

    await tick({ sql, email, config }); // step 0
    const r = await tick({ sql, email, config }); // step 1 not due
    expect(r.sent).toBe(0);
    expect(await messagesFor("cara@example.com")).toHaveLength(1);

    const [enr] = await sql<{ status: string; current_step: number }[]>`
      select status, current_step from outreach_enrollments where contact_id = ${contactId}
    `;
    expect(enr!.status).toBe("active");
    expect(enr!.current_step).toBe(1);

    const [m] = await sql<{ status: string }[]>`
      select status from outreach_messages where contact_id = ${contactId} and step_index = 1
    `;
    expect(m!.status).toBe("scheduled");
  });

  it("stops the sequence when the contact unsubscribes mid-flight", async () => {
    const campaignId = await seedCampaign([0, 0]);
    const contactId = await addContact("dee@example.com", "Dee", "Bar D");
    await enrollContact(sql, campaignId, contactId);

    await tick({ sql, email, config }); // step 0 sent; step 1 scheduled due now
    await waitForMail("dee@example.com", 1);

    // Contact unsubscribes.
    await repo.addSuppression(sql, "dee@example.com", "unsubscribe");
    await repo.markContactUnsubscribed(sql, "dee@example.com");

    const r = await tick({ sql, email, config });
    expect(r.sent).toBe(0);
    expect(r.skipped).toBe(1);
    expect(await messagesFor("dee@example.com")).toHaveLength(1); // only step 0

    const [enr] = await sql<{ status: string; stop_reason: string }[]>`
      select status, stop_reason from outreach_enrollments where contact_id = ${contactId}
    `;
    expect(enr!.status).toBe("stopped");
  });

  it("never enrolls or emails a suppressed contact", async () => {
    await repo.addSuppression(sql, "eve@example.com", "manual");
    const campaignId = await seedCampaign([0]);
    const contactId = await addContact("eve@example.com", "Eve", "Eve Co");

    const res = await enrollContact(sql, campaignId, contactId);
    expect(res.status).toBe("skipped_suppressed");

    const r = await tick({ sql, email, config });
    expect(r.sent).toBe(0);
    expect(await listMailpit()).toHaveLength(0);

    const [{ n }] = await sql<{ n: number }[]>`
      select count(*)::int as n from outreach_messages where contact_id = ${contactId}
    `;
    expect(n).toBe(0);
  });

  it("retries then marks failed after maxAttempts on a send error", async () => {
    const failing: EmailPort = {
      driver: "console",
      send: async () => {
        throw new Error("boom");
      },
    };
    const oneShot = { ...config, maxAttempts: 1 };
    const campaignId = await seedCampaign([0]);
    const contactId = await addContact("fay@example.com", "Fay", "Fay Co");
    await enrollContact(sql, campaignId, contactId);

    const r = await tick({ sql, email: failing, config: oneShot });
    expect(r.failed).toBe(1);

    const [m] = await sql<{ status: string; attempts: number }[]>`
      select status, attempts from outreach_messages where contact_id = ${contactId}
    `;
    expect(m!.status).toBe("failed");
    expect(m!.attempts).toBe(1);

    const [send] = await sql<{ status: string }[]>`
      select status from outreach_sends where to_email = 'fay@example.com'
    `;
    expect(send!.status).toBe("failed");
  });

  it("defers (does not send) while the campaign is paused", async () => {
    const campaignId = await seedCampaign([0], "paused");
    const contactId = await addContact("gus@example.com", "Gus", "Gus Co");
    await enrollContact(sql, campaignId, contactId);

    const r = await tick({ sql, email, config });
    expect(r.sent).toBe(0);
    expect(r.deferred).toBe(1);
    expect(await listMailpit()).toHaveLength(0);

    const [m] = await sql<{ status: string }[]>`
      select status from outreach_messages where contact_id = ${contactId}
    `;
    expect(m!.status).toBe("scheduled");
  });
});
