/** Prospect one-off send via the server action (auth/cache/nav mocked). */
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
import { clearMailpit, messagesFor } from "../helpers/mailpit";

const sql = testSql();

async function seedIntroTemplate() {
  await sql`
    insert into outreach_templates (name, subject, body_html, body_text)
    values ('Restaurantes · 1. Apresentação (sem comissões)',
            'Reservas para o {{business}} sem comissões',
            '<p>Olá {{firstName}}, sobre o {{business}} em {{city}}.</p>',
            'Olá {{firstName}}, sobre o {{business}} em {{city}}.')
  `;
}

/** Run an action that ends in redirect() and return the redirect target. */
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

describe("sendProspectEmail", () => {
  it("sends a per-entry custom email and logs it", async () => {
    await seedIntroTemplate();
    const c = await repo.upsertProspect(sql, {
      email: "ana@example.com",
      firstName: "Ana",
      business: "Garagem 33",
      fields: {
        firstName: "Ana",
        business: "Garagem 33",
        businessName: "Garagem 33",
        industry: "Restaurantes",
        city: "Vila Verde",
      },
    });

    const url = await redirectOf(actions.sendProspectEmail(c.id, null));
    expect(url).toContain("sent=");

    const mp = await messagesFor("ana@example.com");
    expect(mp.length).toBeGreaterThanOrEqual(1);
    expect(mp[0]!.Subject).toBe("Reservas para o Garagem 33 sem comissões");

    const [send] = await sql<{ status: string; body_html: string }[]>`
      select status, body_html from outreach_sends where to_email = 'ana@example.com'
    `;
    expect(send!.status).toBe("sent");
    expect(send!.body_html).toContain("Vila Verde"); // per-entry field rendered

    const [ct] = await sql<{ last_emailed_at: Date | null }[]>`
      select last_emailed_at from outreach_contacts where id = ${c.id}
    `;
    expect(ct!.last_emailed_at).not.toBeNull();
  });

  it("refuses to send when required fields are missing", async () => {
    await seedIntroTemplate();
    const c = await repo.upsertProspect(sql, {
      email: "x@example.com",
      firstName: "",
      business: "",
      fields: { industry: "Restaurantes" },
    });
    const url = await redirectOf(actions.sendProspectEmail(c.id, null));
    expect(url).toContain("error=");
    expect(await messagesFor("x@example.com")).toHaveLength(0);
  });

  it("refuses to send to a suppressed address", async () => {
    await seedIntroTemplate();
    const c = await repo.upsertProspect(sql, {
      email: "sup@example.com",
      firstName: "Sup",
      business: "Biz",
      fields: { firstName: "Sup", business: "Biz", industry: "Restaurantes" },
    });
    await repo.addSuppression(sql, "sup@example.com", "unsubscribe");
    const url = await redirectOf(actions.sendProspectEmail(c.id, null));
    expect(url).toContain("error=");
    expect(await messagesFor("sup@example.com")).toHaveLength(0);
  });
});
