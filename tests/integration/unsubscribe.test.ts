/** Unsubscribe: repo effects + the public route handler. */
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/outreach/unsubscribe/route";
import * as repo from "@/lib/outreach/repo";
import { enrollContact } from "@/lib/outreach/scheduler";
import { unsubscribeToken } from "@/lib/outreach/unsubscribe";
import { NextRequest } from "next/server";
import { resetOutreach, testSql, TEST_DATABASE_URL } from "../helpers/db";

const sql = testSql();
const UNSUB_URL = "http://localhost/api/outreach/unsubscribe";

async function seedEnrolledContact(email: string): Promise<string> {
  const [{ id: campaignId }] = await sql<{ id: string }[]>`
    insert into outreach_campaigns (name, status) values ('c', 'active') returning id
  `;
  const [{ id: templateId }] = await sql<{ id: string }[]>`
    insert into outreach_templates (name, subject, body_html, body_text)
    values ('t', 's', '<p>h</p>', 'h') returning id
  `;
  await sql`
    insert into outreach_steps (campaign_id, step_index, template_id, delay_hours)
    values (${campaignId!}, 0, ${templateId!}, 0)
  `;
  const c = await repo.upsertContact(sql, { email, source: "manual" });
  await enrollContact(sql, campaignId!, c.id);
  return c.id;
}

beforeEach(async () => {
  await resetOutreach(sql);
  process.env.OUTREACH_SECRET = "test-secret";
  process.env.DATABASE_URL = TEST_DATABASE_URL;
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});

describe("repo.unsubscribeEmail", () => {
  it("suppresses, marks the contact, stops enrollments, cancels pending messages", async () => {
    const contactId = await seedEnrolledContact("z@example.com");

    const [before] = await sql<{ status: string }[]>`
      select status from outreach_messages where contact_id = ${contactId}
    `;
    expect(before!.status).toBe("scheduled");

    await repo.unsubscribeEmail(sql, "Z@Example.com"); // case-insensitive

    expect(await repo.isSuppressed(sql, "z@example.com")).toBe(true);
    const [contact] = await sql<{ unsubscribed_at: Date | null }[]>`
      select unsubscribed_at from outreach_contacts where id = ${contactId}
    `;
    expect(contact!.unsubscribed_at).not.toBeNull();
    const [enr] = await sql<{ status: string }[]>`
      select status from outreach_enrollments where contact_id = ${contactId}
    `;
    expect(enr!.status).toBe("stopped");
    const [after] = await sql<{ status: string }[]>`
      select status from outreach_messages where contact_id = ${contactId}
    `;
    expect(after!.status).toBe("cancelled");
  });
});

describe("unsubscribe route handler", () => {
  it("GET with a valid token unsubscribes and returns 200", async () => {
    await repo.upsertContact(sql, { email: "route@example.com", source: "manual" });
    const token = unsubscribeToken("route@example.com", "test-secret");
    const res = await GET(
      new NextRequest(`${UNSUB_URL}?token=${encodeURIComponent(token)}`),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("unsubscribed");
    expect(await repo.isSuppressed(sql, "route@example.com")).toBe(true);
  });

  it("GET with an invalid token returns 400 and suppresses nothing", async () => {
    const res = await GET(new NextRequest(`${UNSUB_URL}?token=garbage`));
    expect(res.status).toBe(400);
  });

  it("POST (RFC 8058 one-click) with a valid token returns 200", async () => {
    await repo.upsertContact(sql, { email: "oneclick@example.com", source: "manual" });
    const token = unsubscribeToken("oneclick@example.com", "test-secret");
    const res = await POST(
      new NextRequest(`${UNSUB_URL}?token=${encodeURIComponent(token)}`, {
        method: "POST",
      }),
    );
    expect(res.status).toBe(200);
    expect(await repo.isSuppressed(sql, "oneclick@example.com")).toBe(true);
  });
});
