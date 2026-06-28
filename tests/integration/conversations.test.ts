/** Inbound webhook + conversation threading (sent + received). */
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/outreach/inbound/route";
import { getThread, listConversations } from "@/lib/outreach/admin";
import * as repo from "@/lib/outreach/repo";
import { NextRequest } from "next/server";
import { resetOutreach, testSql } from "../helpers/db";

const sql = testSql();
const URL = "http://localhost/api/outreach/inbound";

function inboundReq(body: unknown, token = "inbound-secret"): NextRequest {
  return new NextRequest(URL, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(async () => {
  await resetOutreach(sql);
  process.env.DATABASE_URL =
    process.env.TEST_DATABASE_URL ?? "postgres://postgres:postgres@localhost:5544/guestoverflow_test";
  process.env.OUTREACH_INBOUND_SECRET = "inbound-secret";
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});

describe("inbound webhook", () => {
  it("stores a received email and matches it to the contact", async () => {
    const c = await repo.upsertContact(sql, { email: "ana@example.com", source: "prospect" });
    const res = await POST(
      inboundReq({
        from: "Ana Silva <ana@example.com>",
        to: "sales@guestoverflow.com",
        subject: "Re: Reservas",
        text: "Sim, interessa-me. Podemos falar?",
        messageId: "<m-1@mail>",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, stored: true });

    const [row] = await sql<{ from_email: string; from_name: string; contact_id: string }[]>`
      select from_email, from_name, contact_id from outreach_inbound where from_email = 'ana@example.com'
    `;
    expect(row!.from_name).toBe("Ana Silva");
    expect(row!.contact_id).toBe(c.id);
  });

  it("rejects without a valid token", async () => {
    const res = await POST(inboundReq({ from: "x@y.com" }, "wrong"));
    expect(res.status).toBe(401);
  });

  it("dedupes on Message-ID", async () => {
    const body = { from: "bob@example.com", subject: "hi", text: "hi", messageId: "<dup@mail>" };
    await POST(inboundReq(body));
    const res2 = await POST(inboundReq(body));
    expect(await res2.json()).toMatchObject({ stored: false });
    const [{ n }] = await sql<{ n: number }[]>`
      select count(*)::int as n from outreach_inbound where message_id = '<dup@mail>'
    `;
    expect(n).toBe(1);
  });
});

describe("conversation thread", () => {
  it("unions sent + received chronologically", async () => {
    await repo.recordSend(sql, {
      messageId: null,
      campaignId: null,
      contactId: null,
      toEmail: "bob@example.com",
      subject: "Reservas para o Bob Co",
      providerMessageId: "p1",
      status: "sent",
      bodyHtml: "<p>olá</p>",
      bodyText: "olá",
    });
    await repo.insertInbound(sql, {
      fromEmail: "bob@example.com",
      subject: "Re: Reservas",
      bodyText: "sim",
      receivedAt: new Date(Date.now() + 60_000),
    });

    const thread = await getThread("bob@example.com");
    expect(thread).toHaveLength(2);
    expect(thread[0]!.direction).toBe("sent");
    expect(thread[1]!.direction).toBe("received");

    const convos = await listConversations();
    const bob = convos.find((c) => c.email === "bob@example.com");
    expect(bob).toBeTruthy();
    expect(bob!.sent_count).toBe(1);
    expect(bob!.received_count).toBe(1);
    expect(bob!.msg_count).toBe(2);
  });
});
