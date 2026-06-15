# Website — file-by-file inventory

A deploy-oriented map of the GuestOverflow **website** module (Next.js 16, App
Router). Format per file: `purpose; [server/client]; [touches: env/DB/services]`.
Saas module is documented separately later.

## Runtime / deploy summary

- **Stack:** Next.js 16 (App Router), React 19, Tailwind v4, GSAP, Zod, `postgres` driver.
- **Output:** `output: "standalone"` → containerized via the repo `Dockerfile`.
- **Database:** direct Postgres via `DATABASE_URL` (schema in `supabase/migrations/`). Degrades gracefully to console logging when unset.
- **Email:** Resend (optional) for demo-request notifications.
- **Auth:** stateless HMAC-signed cookie (`gf_admin`), no session store.
- **Cloudflare-aware:** the analytics route already reads `cf-connecting-ip` and `cf-ipcountry`, and rate-limits on real client IP. This matters for the proxy/edge config (see deploy README).

### Environment variables (all server-side)
| Var | Used by | Required? |
| --- | --- | --- |
| `DATABASE_URL` | `lib/db.ts`, all admin pages, `/api/t`, `/api/demo-request`, seed | Prod yes (site degrades without) |
| `ADMIN_SESSION_SECRET` | `lib/admin/auth.ts`, `proxy.ts`, `/api/t` daily salt | Prod yes (defaults to dev secret) |
| `ADMIN_USER` / `ADMIN_PASSWORD` | `lib/admin/auth.ts`, login | Prod yes (defaults `admin`/`admin`) |
| `RESEND_API_KEY` | `/api/demo-request` | Optional |
| `LEAD_NOTIFY_EMAIL` / `LEAD_FROM_EMAIL` | `/api/demo-request` | Optional (with Resend) |
| `NEXT_PUBLIC_SITE_URL` | metadata/sitemap | Build-time (baked per image) |

---

## Root config
- `next.config.ts` — Next config; `output: "standalone"` for Docker. server
- `proxy.ts` — **Next 16 middleware-equivalent** (exports `proxy()` + `config.matcher` for `/admin/*` and `/api/admin/*`). Verifies the HMAC `gf_admin` cookie; redirects to `/admin/login` or returns 401 for API. touches: `ADMIN_SESSION_SECRET`
- `postcss.config.mjs` — Tailwind v4 PostCSS. build
- `eslint.config.mjs` — ESLint (next core-web-vitals + TS). build
- `tsconfig.json` — TS config, path alias `@/*`. build
- `Dockerfile` / `.dockerignore` — multi-stage standalone image. deploy
- `.github/workflows/deploy.yml` — CD: build→GHCR→SSH deploy. deploy

## `app/` (root)
- `layout.tsx` — root layout, fonts (Fraunces/Inter), metadata. server
- `globals.css` — Tailwind theme tokens, animations. style
- `locale-action.ts` — server action to set `LOCALE_COOKIE`. server
- `not-found.tsx` — bilingual 404 with Header/Footer. server
- `robots.ts` — robots.txt (disallow `/admin`, `/api`). server
- `sitemap.ts` — XML sitemap (static + industry slugs). server

## `app/(site)/` — public site (all server components)
- `layout.tsx` — Lenis scroll, Header/Footer, AnalyticsProvider, JSON-LD.
- `page.tsx` — home (Hero, ProblemStrip, widget, HowItWorks, etc.).
- `about/page.tsx` · `product/page.tsx` · `pricing/page.tsx` — marketing pages.
- `industries/page.tsx` — industry index grid.
- `industries/[slug]/page.tsx` — industry detail (`generateStaticParams`).
- `book-a-demo/page.tsx` — demo page + live widget + form.
- `privacy/page.tsx` · `terms/page.tsx` — legal pages.

## `app/admin/` — admin panel
- `login/page.tsx` — login page; warns on default creds. server; `ADMIN_USER/PASSWORD`
- `login/LoginForm.tsx` — login form (`useActionState`). client
- `login/actions.ts` — `loginAction` (per-IP brute-force limit) + `logoutAction`. server; `ADMIN_SESSION_SECRET`
- `(panel)/layout.tsx` — sidebar shell, `force-dynamic`, default-creds banner. server
- `(panel)/page.tsx` — analytics overview. server; `DATABASE_URL`
- `(panel)/leads/page.tsx` + `actions.ts` — lead CRM + status update. server; `DATABASE_URL`
- `(panel)/clients/page.tsx` · `[id]/page.tsx` · `actions.ts` — client roster/detail + mutations. server; `DATABASE_URL`
- `(panel)/friction/page.tsx` — rage clicks, form abandons, JS errors. server; `DATABASE_URL`
- `(panel)/funnel/page.tsx` — conversion funnel by source/device. server; `DATABASE_URL`

## `app/api/` — route handlers
- `health/route.ts` — liveness probe (`force-dynamic`). server
- `demo-request/route.ts` — POST: rate-limit (5/h/IP), Zod validate, insert lead, Resend email. server; `DATABASE_URL`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL`
- `t/route.ts` — cookieless analytics ingest: SHA-256 visitorId from daily salt+IP+UA, UA parse, 120/min/IP limit, bot filter. server; `DATABASE_URL`, `ADMIN_SESSION_SECRET`; reads `cf-connecting-ip`, `cf-ipcountry`

## `components/admin/`
- `AdminField.tsx` (server), `LeadStatusSelect.tsx` (client, optimistic), `RagDot.tsx` (server), `RangePicker.tsx` (client), `SidebarNav.tsx` (server)
- `charts/`: `BarChart`, `FunnelBars`, `HBarList`, `TrendLine` (client, GSAP); `StatCard` (server)

## `components/analytics/`
- `AnalyticsProvider.tsx` — client runtime: session id, UTM capture, 5s/10-event flush, page view/engagement/scroll, rage-click + JS-error dedup. client

## `components/layout/`
- `Header.tsx` (client, scroll state + nav + lang toggle), `Footer.tsx` (server), `FooterCta.tsx` (server), `LanguageToggle.tsx` (client), `LegalLayout.tsx` (server)

## `components/sections/`
- `demo/`: `DemoForm.tsx` (client; POSTs `/api/demo-request`, honeypot, field telemetry), `DemoFormSuccess.tsx` (client)
- `home/`: `Hero` + `HeroParticles` (client, canvas); `BuiltForStrip`, `Differentiators`, `HowItWorks`, `IndustriesPreview`, `NoWebsitePath`, `ProblemStrip`, `PromiseStrip` (server)
- `pricing/PricingTiers.tsx` (server), `product/FeatureGrid.tsx` + `OwnYourData.tsx` (server)
- `shared/`: `FaqSection.tsx` (client), `PageHero.tsx` (server), `WidgetShowcase.tsx` (client)

## `components/ui/` — design system
- Client (GSAP): `Accordion.tsx`, `Reveal.tsx`.
- Server: `Badge`, `Button`, `Card`, `Container`, `Field`, `Icon`, `Logo`, `SectionHeading`.

## `components/widget/` — booking demo (all client)
- `BookingWidget.tsx`, `ThemeSwitcher.tsx`, `WidgetFrame.tsx`, `WidgetProgress.tsx`
- `steps/`: `PartyStep`, `DateStep`, `TimeStep`, `DetailsStep`, `ConfirmationStep`
- `useBookingMachine.ts` (state machine), `wgStyles.ts` (themed CSS)

## `content/` — static bilingual (EN/PT) copy (all server)
`about`, `demo`, `faq`, `form`, `home`, `industries`, `pricing`, `product`, `site`, `widget-themes`, `widget-ui`.

## `lib/`
- `db.ts` — Postgres singleton via `DATABASE_URL` (`server-only`); returns null when unset. server; `DATABASE_URL`
- `admin/auth.ts` — HMAC session create/verify, constant-time cred check, `requireAdmin` guard. server; `ADMIN_SESSION_SECRET`, `ADMIN_USER/PASSWORD`
- `admin/queries.ts` — admin dashboard query types. server; `DATABASE_URL`
- `admin/range.ts` — 7d/30d/90d range parser. server
- `analytics.ts` — client event queue + form telemetry. client
- `availability.ts` — deterministic demo slot generation. client
- `gsap.ts` — GSAP/ScrollTrigger registration. client
- `i18n.ts` (server, reads `LOCALE_COOKIE`), `i18n-shared.ts` (shared type), `locale-client.tsx` (client context)
- `lenis-provider.tsx` — smooth scroll + GSAP. client
- `utils.ts` — `cn()`, date formatting. shared
- `validations.ts` — Zod `demoRequestSchema`, business types, slots. server

## `types/content.ts`
Shared content/domain types (NavLink, FaqItem, IndustryContent, PricingTier, VenueTheme, IconName, …).

## `scripts/seed-admin.ts`
Seeds demo analytics/leads/clients with deterministic PRNG. dev; `DATABASE_URL`

## `supabase/`
- `config.toml` — local Supabase dev ports. dev
- `migrations/` (apply in order against the stack's Postgres):
  1. `…0001_leads.sql` — `leads` table.
  2. `…0002_events.sql` — `events` table (+ indexes) for analytics.
  3. `…0003_clients.sql` — `clients`, `implementations`, `health_assessments`, `monthly_figures`, `touchpoints` (+ RLS, `sync_client_health` trigger).
  4. `…0004_admin_queries.sql` — SQL aggregation functions powering the dashboards.
  5. `…0005`–`0008` — `leads` column evolution (web_presence, business_type_other, web_presence→array, preferred_window→preferred_slots array).

> Note: migrations are written as Supabase SQL but are plain Postgres DDL — they
> apply identically to the self-hosted Postgres container.
