# Guest Overflow — sales website

Marketing and lead-generation website for **Guest Overflow**, a white-label
online booking platform for restaurants, hotels, spas, and experience
businesses. Built by [MoggingLabs](https://github.com/MoggingLabs).

The centerpiece is a **live interactive booking widget** (`components/widget/`)
— a fully client-side mock of the product that prospects can try on the page,
with four venue themes demonstrating the white-label pitch.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css` `@theme`)
- GSAP + ScrollTrigger, Lenis smooth scroll (reduced-motion aware)
- Postgres (lead storage) + Resend (notifications) — both optional/env-gated
- Vercel Analytics

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

The site runs fully without env vars; demo-form leads and analytics
events are logged to the server console in that mode. For real data,
copy `.env.example` to `.env.local` and set `DATABASE_URL`.

## Data: one Postgres, three jobs

Everything (leads, first-party analytics events, the client tracker)
lives in one Postgres database reached via `DATABASE_URL`. The schema is
defined by the SQL files in `db/migrations/`, which apply
unchanged to any PostgreSQL database.

- **Local development:** native PostgreSQL, e.g.
  `postgres://postgres:postgres@localhost:5432/guestoverflow`. Apply
  migrations with `psql -d guestoverflow -f db/migrations/<file>.sql`
  (in order).
- **Demo data:** `npm run seed -- --yes` fills the dashboard with 45
  days of realistic events, leads, and clients. Seeded events carry
  `props.seed = true` so they can be told apart from real traffic.
- **Admin dashboard:** `/admin` (default login admin/admin until env
  vars are set). The Overview header shows a live-tracking heartbeat:
  the timestamp of the last real (non-seed) visitor event.

## Going live checklist

1. Provision the production Postgres and apply the migrations in
   `db/migrations/` in order (`psql -f`).
2. On the host, set `DATABASE_URL` to the production Postgres connection
   string — the client runs with `prepare: false`, so transaction-pooled
   connections work too.
3. Set `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (the
   admin/admin defaults must never reach production; the panel shows a
   warning until these are set).
4. Set `NEXT_PUBLIC_SITE_URL` to the real domain, plus Resend keys if
   lead emails are wanted.
5. Wipe the demo data so dashboards show only real traffic:
   `npm run seed -- --yes --clear` (or run it against production by
   setting `DATABASE_URL` for that one command).
6. Visit the live site once, then check `/admin` shows
   "Tracking live" with a recent timestamp.

## Project conventions

- **All copy lives in `content/*.ts`** — pages are thin server components
  that pass typed data into `components/sections/*`. Copy edits never
  touch JSX.
- Adding an industry vertical = adding one entry to
  `content/industries.ts` (routes, metadata, and cards derive from it).
- Widget venue themes live in `content/widget-themes.ts`; the widget is
  self-contained under `components/widget/` for future extraction.
- Amber (`--color-amber`) is the single accent: CTAs, eyebrows,
  highlights only — never large background fills.
