/** Individual "Send Email" action: sends the edited content to a lead/prospect. */
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/admin/auth", () => ({ requireAdmin: vi.fn(async () => {}) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

import * as actions from "@/app/admin/(panel)/outreach/actions";
import * as repo from "@/lib/outreach/repo";
import { resetOutreach, testSql, TEST_DATABASE_URL } from "../helpers/db";
import { clearMailpit, getMailpitMessage, messagesFor } from "../helpers/mailpit";

const sql = testSql();

function fd(o: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.append(k, v);
  return f;
}
async function redirectOf(p: Promise<unknown>): Promise<string> {
  try {
    await p;
    return "";
  } catch (e) {
    const m = (e as Error).message;
    return m.startsWith("REDIRECT:") ? m.slice("REDIRECT:".length) : `THREW:${m}`;
  }
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

describe("sendIndividualEmail", () => {
  it("sends the edited subject/body to a prospect and logs it", async () => {
    const c = await repo.upsertProspect(sql, {
      email: "ana@example.com",
      firstName: "Ana",
      business: "Garagem 33",
      fields: { firstName: "Ana", business: "Garagem 33", industry: "Restaurantes" },
    });
    const url = await redirectOf(
      actions.sendIndividualEmail(
        fd({ recipient: `contact:${c.id}`, subject: "Ideia para a Garagem 33", body: "Olá Ana,\n\nTexto editado à mão." }),
      ),
    );
    expect(url).toContain("sent=");

    const mp = await messagesFor("ana@example.com");
    expect(mp.length).toBeGreaterThanOrEqual(1);
    expect(mp[0]!.Subject).toBe("Ideia para a Garagem 33");
    const detail = await getMailpitMessage(mp[0]!.ID);
    expect(detail.Text).toContain("Texto editado à mão.");
    expect(detail.HTML).toContain("/api/outreach/unsubscribe"); // footer added

    const [send] = await sql<{ status: string }[]>`
      select status from outreach_sends where to_email = 'ana@example.com'
    `;
    expect(send!.status).toBe("sent");
    const [ct] = await sql<{ last_emailed_at: Date | null }[]>`
      select last_emailed_at from outreach_contacts where id = ${c.id}
    `;
    expect(ct!.last_emailed_at).not.toBeNull();
  });

  it("sends to a lead, upserting it as a tracked contact", async () => {
    await sql`insert into leads (name, email, business_name, business_type) values ('Bob', 'bob@example.com', 'Bob Co', 'restaurant')`;
    const [l] = await sql<{ id: number }[]>`select id from leads where email = 'bob@example.com'`;
    const url = await redirectOf(
      actions.sendIndividualEmail(fd({ recipient: `lead:${l!.id}`, subject: "Olá Bob", body: "Mensagem." })),
    );
    expect(url).toContain("sent=");
    expect((await messagesFor("bob@example.com")).length).toBeGreaterThanOrEqual(1);
    const [c] = await sql<{ source: string }[]>`
      select source from outreach_contacts where lower(email) = 'bob@example.com'
    `;
    expect(c!.source).toBe("lead");
  });

  it("sends to a manual recipient and saves them as a prospect", async () => {
    const url = await redirectOf(
      actions.sendIndividualEmail(
        fd({
          m_email: "new@example.com",
          m_first: "Nova",
          m_business: "Nova Co",
          m_industry: "Restaurantes",
          subject: "Olá Nova",
          body: "Mensagem para a Nova Co.",
        }),
      ),
    );
    expect(url).toContain("sent=");
    expect((await messagesFor("new@example.com")).length).toBeGreaterThanOrEqual(1);
    const [c] = await sql<{ source: string; business_name: string; fields: Record<string, string> }[]>`
      select source, business_name, fields from outreach_contacts where lower(email) = 'new@example.com'
    `;
    expect(c!.source).toBe("prospect");
    expect(c!.business_name).toBe("Nova Co");
    expect(c!.fields.industry).toBe("Restaurantes");
  });

  it("refuses to send to a suppressed address", async () => {
    const c = await repo.upsertProspect(sql, { email: "sup@example.com", firstName: "S", business: "B", fields: {} });
    await repo.addSuppression(sql, "sup@example.com", "unsubscribe");
    const url = await redirectOf(
      actions.sendIndividualEmail(fd({ recipient: `contact:${c.id}`, subject: "x", body: "y" })),
    );
    expect(url).toContain("error=");
    expect(await messagesFor("sup@example.com")).toHaveLength(0);
  });
});

describe("updateTemplate", () => {
  it("edits an existing template (name/subject/body + regenerated html)", async () => {
    const [t] = await sql<{ id: string }[]>`
      insert into outreach_templates (name, subject, body_html, body_text)
      values ('X', 'old subj', '<p>old</p>', 'old') returning id
    `;
    const url = await redirectOf(
      actions.updateTemplate(
        t!.id,
        fd({ name: "Restaurantes · X", subject: "new {{business}}", body_text: "new body {{firstName}}" }),
      ),
    );
    expect(url).toContain("saved=1");
    const [u] = await sql<{ name: string; subject: string; body_text: string; body_html: string }[]>`
      select name, subject, body_text, body_html from outreach_templates where id = ${t!.id}
    `;
    expect(u!.name).toBe("Restaurantes · X");
    expect(u!.subject).toBe("new {{business}}");
    expect(u!.body_text).toBe("new body {{firstName}}");
    expect(u!.body_html).toContain("new body");
  });
});
