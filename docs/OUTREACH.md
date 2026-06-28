# Outbound email outreach

Automatic, multi-step cold/warm email outreach, driven from **Admin → Outreach**.
Built into the website app: reuses Resend, the `leads` table, and the admin
auth already in place, and adds the data model, automation worker, compliance
controls, and UI for running sequences.

## What it does

- **Templates** with `{{firstName}}` / `{{business}}` merge fields (plain text;
  HTML auto-generated or hand-authored). A one-click **unsubscribe footer** is
  always appended.
- **Campaigns = ordered drip sequences.** Step 0 goes out on enrollment; each
  later step is scheduled `delay_hours` after the previous send.
- **Recipients** from the demo-form **leads** (one click) or pasted/CSV cold
  prospects (`email, name, business` per line).
- **A durable worker** sends due messages, retries failures with backoff, and
  advances the sequence — restart-safe, multi-replica-safe.
- **Compliance**: every send carries `List-Unsubscribe` + RFC 8058 one-click
  POST; unsubscribe/suppression is enforced on every send and at enrollment; a
  suppressed address is never emailed again.

## Architecture

| Piece | Where |
|------|-------|
| Schema (8 tables) | `db/migrations/20260628000001_outreach.sql` |
| Email port (Resend / SMTP-mailpit / console) | `lib/outreach/email.ts` |
| Template rendering + unsubscribe footer | `lib/outreach/templates.ts` |
| Stateless unsubscribe tokens (HMAC) | `lib/outreach/unsubscribe.ts` |
| Data access | `lib/outreach/repo.ts` |
| Enroll / advance sequence | `lib/outreach/scheduler.ts` |
| Claim-and-send tick | `lib/outreach/sender.ts` |
| Worker process | `scripts/outreach-worker.ts` → bundled `dist/outreach-worker.mjs` |
| Admin UI | `app/admin/(panel)/outreach/**` |
| Unsubscribe route | `app/api/outreach/unsubscribe/route.ts` |

The worker claims due rows with `UPDATE … FOR UPDATE SKIP LOCKED` and a 10-min
crash lease, so Postgres is the only source of truth — a worker restart or
Redis-style wipe loses nothing, and replicas cooperate without double-sending.

## Run it locally

```bash
docker compose up -d                        # postgres (:5544) + mailpit (:8025)
# one-time: point DATABASE_URL at the dev DB and migrate
DATABASE_URL=postgres://postgres:postgres@localhost:5544/guestoverflow \
  node scripts/migrate.mjs

# web app (admin UI) — http://localhost:3000/admin  (default creds admin/admin)
DATABASE_URL=postgres://postgres:postgres@localhost:5544/guestoverflow \
OUTREACH_MAIL_DRIVER=smtp pnpm dev

# the worker, in a second terminal — sends due emails to mailpit
DATABASE_URL=postgres://postgres:postgres@localhost:5544/guestoverflow \
OUTREACH_MAIL_DRIVER=smtp pnpm worker
```

Open mailpit at <http://localhost:8025> to see what the worker sends.

### Try it
1. Admin → Outreach → create a **template**.
2. Create a **campaign**, add a **step** (template + delay), **Activate** it.
3. **Import leads** or paste prospects.
4. Within ~15s the worker sends step 0 (watch mailpit); follow-ups fire on schedule.
5. **Send a test** from the campaign page to preview merge output.

## Tests

```bash
pnpm test            # 28 tests: unit + integration (needs docker compose up)
pnpm test:unit       # unit only (templates, unsubscribe) — no services needed
```

Integration tests deliver real email over SMTP to mailpit and assert via its
API, covering enroll→send→advance, future delays, unsubscribe-stops-sequence,
suppression, retry/fail, paused-defer, the unsubscribe route, and the admin
server actions.

## Production

The worker ships as a **second container off the same image** (see
`deploy/website/{production,staging}/docker-compose.yml`, service
`outreach-worker`, command `node outreach-worker.mjs`). It needs egress to the
Resend API (`web` network) and the DB (`internal` network); no public route.
`OUTREACH_MAIL_DRIVER=resend` + a verified `guestoverflow.com` sender domain.

## Compliance notes (EU / Portugal)

Cold B2B outreach here relies on legitimate interest with an always-present,
one-click opt-out and an enforced suppression list. Keep volumes modest, honour
replies, and never re-add an unsubscribed address. The unsubscribe link is
unguessable (HMAC) and works without login.
