/**
 * Drives the admin Outreach server actions directly (auth + Next cache/nav
 * mocked) to prove the "draft and send" UI path end-to-end: create a
 * template, a campaign, a step, import recipients, and send a test that lands
 * in mailpit.
 */
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/admin/auth", () => ({ requireAdmin: vi.fn(async () => {}) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

import * as actions from "@/app/admin/(panel)/outreach/actions";
import { resetOutreach, testSql, TEST_DATABASE_URL } from "../helpers/db";
import { clearMailpit, messagesFor } from "../helpers/mailpit";

const sql = testSql();

function fd(obj: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(obj)) f.append(k, v);
  return f;
}

beforeEach(async () => {
  await resetOutreach(sql);
  await sql`delete from leads`;
  await clearMailpit();
  process.env.DATABASE_URL = TEST_DATABASE_URL;
  process.env.OUTREACH_MAIL_DRIVER = "smtp";
  process.env.OUTREACH_SMTP_HOST = "localhost";
  process.env.OUTREACH_SMTP_PORT = "1025";
  process.env.OUTREACH_SECRET = "test-secret";
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});

async function newCampaign(name: string): Promise<string> {
  // createCampaign ends in redirect() which our mock throws — swallow it.
  await actions.createCampaign(fd({ name })).catch(() => {});
  const [c] = await sql<{ id: string }[]>`
    select id from outreach_campaigns order by created_at desc limit 1
  `;
  return c!.id;
}

describe("outreach server actions", () => {
  it("template → campaign → step → paste recipients → test send", async () => {
    await actions.createTemplate(
      fd({
        name: "Intro",
        subject: "A booking page for {{business}}",
        body_text: "Hi {{firstName}}, we built something for {{business}}.",
      }),
    );
    const [tpl] = await sql<{ id: string }[]>`select id from outreach_templates`;
    expect(tpl).toBeTruthy();

    const campaignId = await newCampaign("Spring outreach");
    await actions.addStep(campaignId, fd({ template_id: tpl!.id, delay_hours: "0" }));
    await actions.setCampaignStatus(campaignId, "active");

    const steps = await sql`select * from outreach_steps where campaign_id = ${campaignId}`;
    expect(steps).toHaveLength(1);

    // Cold paste import enrolls the contact and schedules step 0.
    await actions.importPasted(
      campaignId,
      fd({ contacts: "ana@example.com, Ana, Garagem 33" }),
    );
    const enrollments = await sql`
      select * from outreach_enrollments where campaign_id = ${campaignId}
    `;
    expect(enrollments).toHaveLength(1);
    const messages = await sql`
      select * from outreach_messages where campaign_id = ${campaignId}
    `;
    expect(messages).toHaveLength(1);

    // Test send goes out immediately and is captured by mailpit.
    await actions.sendTest(campaignId, fd({ to: "tester@example.com", step_index: "0" }));
    const mp = await messagesFor("tester@example.com");
    expect(mp.length).toBeGreaterThanOrEqual(1);
    expect(mp[0]!.Subject).toContain("[TEST]");
    expect(mp[0]!.Subject).toContain("Test Business");
  });

  it("importLeads enrolls existing leads as contacts", async () => {
    await sql`
      insert into leads (name, email, business_name, business_type)
      values ('Bob', 'bob@example.com', 'Bob Co', 'restaurant')
    `;
    const [tpl] = await sql<{ id: string }[]>`
      insert into outreach_templates (name, subject, body_html, body_text)
      values ('t', 's', '<p>h</p>', 'h') returning id
    `;
    const campaignId = await newCampaign("Leads campaign");
    await actions.addStep(campaignId, fd({ template_id: tpl!.id, delay_hours: "0" }));

    await actions.importLeads(campaignId);

    const contacts = await sql`
      select * from outreach_contacts where lower(email) = 'bob@example.com'
    `;
    expect(contacts).toHaveLength(1);
    const enrollments = await sql`
      select * from outreach_enrollments where campaign_id = ${campaignId}
    `;
    expect(enrollments).toHaveLength(1);
  });
});
