/** Minimal mailpit REST client for asserting captured outreach emails. */
export const MAILPIT_URL = process.env.MAILPIT_URL ?? "http://localhost:8025";

export interface MailpitSummary {
  ID: string;
  To: { Address: string; Name: string }[];
  From: { Address: string; Name: string };
  Subject: string;
}

export interface MailpitMessage extends MailpitSummary {
  Text: string;
  HTML: string;
}

export async function clearMailpit(): Promise<void> {
  await fetch(`${MAILPIT_URL}/api/v1/messages`, { method: "DELETE" });
}

export async function listMailpit(): Promise<MailpitSummary[]> {
  const res = await fetch(`${MAILPIT_URL}/api/v1/messages`);
  const data = (await res.json()) as { messages?: MailpitSummary[] };
  return data.messages ?? [];
}

export async function getMailpitMessage(id: string): Promise<MailpitMessage> {
  const res = await fetch(`${MAILPIT_URL}/api/v1/message/${id}`);
  return (await res.json()) as MailpitMessage;
}

export async function messagesFor(email: string): Promise<MailpitSummary[]> {
  const all = await listMailpit();
  const needle = email.toLowerCase();
  return all.filter((m) =>
    m.To?.some((t) => t.Address.toLowerCase() === needle),
  );
}
