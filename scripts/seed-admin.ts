/**
 * Seeds the database with realistic demo data so the admin dashboard
 * has something to show: ~45 days of analytics events with believable
 * funnel decay, a stack of leads, and 8 clients with implementation
 * histories whose booking figures visibly react to ship dates.
 *
 * Usage: npm run seed -- --yes   (truncates analytics/client tables first)
 */
import postgres from "postgres";
import { randomUUID, createHash } from "node:crypto";

const url = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/guestoverflow";
const sql = postgres(url, { max: 4, prepare: false });

if (!process.argv.includes("--yes")) {
  console.error("Refusing to run without --yes (this truncates seeded tables).");
  process.exit(1);
}

// `npm run seed -- --yes --clear` wipes demo data without inserting new
// rows. Run once before going live so the dashboard shows only real data.
const clearOnly = process.argv.includes("--clear");

// Deterministic PRNG so reruns produce the same shape.
let seedState = 42;
function rand(): number {
  seedState = (seedState * 1664525 + 1013904223) >>> 0;
  return seedState / 0xffffffff;
}
function pick<T>(items: T[], weights?: number[]): T {
  if (!weights) return items[Math.floor(rand() * items.length)];
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = rand() * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}
function intBetween(min: number, max: number): number {
  return min + Math.floor(rand() * (max - min + 1));
}

const PAGES = ["/", "/product", "/pricing", "/industries", "/industries/restaurants", "/industries/hotels", "/industries/spas-wellness", "/industries/tours-experiences", "/about", "/book-a-demo"];
const PAGE_WEIGHTS = [40, 12, 14, 6, 8, 5, 4, 3, 4, 10];
const SOURCES: (string | null)[] = [null, "google.com", "instagram.com", "facebook.com", "linkedin.com", "partner-blog.com"];
const SOURCE_WEIGHTS = [30, 28, 16, 8, 10, 8];
const DEVICES = ["desktop", "mobile", "tablet"];
const DEVICE_WEIGHTS = [58, 37, 5];
const BROWSERS = ["Chrome", "Safari", "Edge", "Firefox"];
const COUNTRIES = ["PT", "ES", "GB", "DE", "US", "FR", "NL"];
const COUNTRY_WEIGHTS = [34, 14, 16, 10, 12, 8, 6];
const THEMES = ["fine-dining", "hotel", "spa", "wine-bar"];
const FORM_FIELDS = ["name", "email", "businessName", "businessType"];

type EventRow = {
  ts: Date; visitor_id: string; session_id: string; event: string;
  props: Record<string, string | number | boolean>; url_path: string;
  referrer: string | null; utm: Record<string, string> | null;
  device: string; browser: string; os: string; country: string;
};

function buildEvents(): EventRow[] {
  const events: EventRow[] = [];
  const now = Date.now();
  const DAY = 86_400_000;

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  for (let daysAgo = 45; daysAgo >= 0; daysAgo--) {
    const dayStart = todayMidnight.getTime() - daysAgo * DAY;
    const weekday = new Date(dayStart).getDay();
    const weekendFactor = weekday === 0 || weekday === 6 ? 0.6 : 1;
    const growth = 1 + (45 - daysAgo) / 38; // traffic roughly doubles
    const sessions = Math.round(intBetween(45, 75) * weekendFactor * growth);
    const dayKey = new Date(dayStart).toISOString().slice(0, 10);

    for (let s = 0; s < sessions; s++) {
      const sid = randomUUID();
      const visitor = createHash("sha256").update(`${dayKey}:${s}:${rand()}`).digest("hex");
      const source = pick(SOURCES, SOURCE_WEIGHTS);
      const device = pick(DEVICES, DEVICE_WEIGHTS);
      const browser = pick(BROWSERS);
      const os = device === "desktop" ? pick(["Windows", "macOS"]) : pick(["iOS", "Android"]);
      const country = pick(COUNTRIES, COUNTRY_WEIGHTS);
      const utm = source === "instagram.com" && rand() < 0.5
        ? { source: "instagram", medium: "paid", campaign: "founding-offer" }
        : null;
      let t = dayStart + intBetween(8, 22) * 3_600_000 + intBetween(0, 3_500_000);
      // Never generate events in the future; today's sessions stop at "now".
      if (t > now) continue;
      const base = { visitor_id: visitor, session_id: sid, referrer: source, utm, device, browser, os, country };
      const push = (event: string, url_path: string, props: Record<string, string | number | boolean> = {}) => {
        // The seed marker lets real and demo events be told apart in SQL.
        events.push({ ts: new Date(t), event, props: { ...props, seed: true }, url_path, ...base });
      };

      const entry = pick(PAGES, PAGE_WEIGHTS);
      push("page_view", entry);

      // Funnel decay: engaged 65% → widget 30% → completed 40% of opened
      // → form started 12% → submitted 55% of started. Mobile converts worse.
      const mobilePenalty = device === "mobile" ? 0.75 : 1;
      if (rand() > 0.65 * mobilePenalty) continue;
      t += intBetween(8_000, 30_000);
      push("page_engaged", entry, { via: pick(["time", "scroll"]) });
      push("scroll_depth", entry, { pct: pick([25, 50, 75]) });

      // A second page view for some
      let page = entry;
      if (rand() < 0.45) {
        page = pick(PAGES, PAGE_WEIGHTS);
        t += intBetween(5_000, 40_000);
        push("page_view", page);
      }

      if (rand() < 0.3) {
        const theme = pick(THEMES);
        t += intBetween(4_000, 20_000);
        push("widget_opened", page, { theme });
        if (rand() < 0.45) push("widget_theme_changed", page, { theme: pick(THEMES) });
        for (const step of ["party", "time", "details"]) {
          if (rand() < 0.85) {
            t += intBetween(3_000, 12_000);
            push("widget_step", page, { step });
          } else break;
        }
        if (rand() < 0.4) {
          t += intBetween(4_000, 10_000);
          push("widget_completed", page, { theme });
        }
      }

      if (rand() < 0.12 * mobilePenalty) {
        t += intBetween(5_000, 25_000);
        push("page_view", "/book-a-demo");
        push("demo_form_started", "/book-a-demo");
        let lastField = "name";
        let completed = 0;
        for (const field of FORM_FIELDS) {
          // businessType is the sticking point in the seeded story
          const completeChance = field === "businessType" ? 0.7 : 0.92;
          if (rand() < completeChance) {
            t += intBetween(2_000, 9_000);
            const hesitation = field === "email" || field === "businessType"
              ? intBetween(3_000, 14_000)
              : intBetween(800, 5_000);
            push("form_field_completed", "/book-a-demo", { field, hesitation_ms: hesitation });
            completed++;
            lastField = field;
          } else {
            lastField = field;
            break;
          }
        }
        if (completed === FORM_FIELDS.length && rand() < 0.55) {
          t += intBetween(2_000, 8_000);
          if (rand() < 0.04) {
            push("demo_form_error", "/book-a-demo", { status: 500, message: "Something went wrong. Please email us instead." });
          } else {
            push("demo_form_submitted", "/book-a-demo", { businessType: pick(["Restaurant", "Hotel", "Spa & wellness", "Tours & experiences"]) });
          }
        } else {
          push("demo_form_abandoned", "/book-a-demo", { last_field: lastField, fields_completed: completed });
        }
      }

      // Friction sprinkle: rage clicks concentrated on two elements.
      if (rand() < 0.025) {
        push("rage_click", pick(["/", "/pricing"]), {
          selector: pick(['div.hero-glow', 'span.rounded-sm "2 left"'], [3, 2]),
        });
      }
      if (rand() < 0.012) {
        push("js_error", page, {
          message: pick([
            "TypeError: Cannot read properties of undefined (reading 'theme')",
            "ResizeObserver loop completed with undelivered notifications",
          ]),
          source: "/_next/static/chunks/app.js",
        });
      }
    }
  }
  return events;
}

const LEAD_NAMES = [
  ["Mariana Costa", "Tasca da Ribeira", "Restaurant"],
  ["João Pereira", "Quinta do Vale Hotel", "Hotel"],
  ["Emma Walsh", "The Copper Pot", "Restaurant"],
  ["Sofia Almeida", "Serenity Spa Cascais", "Spa & wellness"],
  ["Tom Becker", "Lisbon Food Tours", "Tours & experiences"],
  ["Inês Rodrigues", "Casa do Mar", "Restaurant"],
  ["Lucas Meyer", "Alfama Wine Walks", "Tours & experiences"],
  ["Carla Nunes", "Hotel Miradouro", "Hotel"],
  ["Pedro Santos", "Barbearia Central", "Salon"],
  ["Ana Ferreira", "O Forno Velho", "Restaurant"],
] as const;

async function seed() {
  console.log("Truncating seeded tables…");
  await sql`truncate events, touchpoints, monthly_figures, health_assessments, implementations, clients, leads restart identity cascade`;

  if (clearOnly) {
    console.log("Cleared. No demo data inserted; the dashboard now shows only real traffic.");
    await sql.end();
    return;
  }

  console.log("Inserting events…");
  const events = buildEvents();
  for (let i = 0; i < events.length; i += 2000) {
    await sql`insert into events ${sql(events.slice(i, i + 2000))}`;
  }
  console.log(`  ${events.length} events`);

  console.log("Inserting leads…");
  const now = Date.now();
  const leadRows = Array.from({ length: 24 }, (_, i) => {
    const [name, business, type] = LEAD_NAMES[i % LEAD_NAMES.length];
    return {
      created_at: new Date(now - intBetween(0, 40) * 86_400_000),
      name,
      email: `${name.toLowerCase().split(" ")[0]}${i}@example.com`,
      business_name: i >= LEAD_NAMES.length ? `${business} ${Math.ceil((i + 1) / LEAD_NAMES.length)}` : business,
      business_type: type,
      preferred_slots:
        rand() < 0.6
          ? Array.from(
              { length: intBetween(1, 3) },
              (_, k) => `${intBetween(9, 15) + k}:${pick(["00", "30"])}`,
            )
          : null,
      message: rand() < 0.4 ? "Found you through the live demo — impressive." : null,
      page_source: "/book-a-demo",
      status: pick(["new", "contacted", "closed"], [4, 4, 2]),
    };
  });
  await sql`insert into leads ${sql(leadRows)}`;

  console.log("Inserting clients…");
  const month = (offset: number) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - offset);
    return d.toISOString().slice(0, 10);
  };

  const clients = [
    { name: "Maré Viva", venue_type: "restaurant", plan: "founding", mrr: 249, status: "active", health: "green", services: ["booking_widget", "website_build"], months: 10, baseBookings: 90, implMonth: 5, implLift: 1.5 },
    { name: "The Anchor House Hotel", venue_type: "hotel", plan: "standard", mrr: 349, status: "active", health: "green", services: ["booking_widget"], months: 8, baseBookings: 55, implMonth: 4, implLift: 1.4 },
    { name: "Páteo 31", venue_type: "restaurant", plan: "pilot_3mo_half_price", mrr: 125, status: "active", health: "green", services: ["gbp_optimization", "booking_widget"], months: 2, baseBookings: 40, implMonth: 1, implLift: 1.6 },
    { name: "Stillpoint Wellness", venue_type: "spa", plan: "standard", mrr: 249, status: "active", health: "amber", services: ["booking_widget"], months: 6, baseBookings: 70, implMonth: 3, implLift: 0.85 },
    { name: "Douro Barrel Tours", venue_type: "tour_operator", plan: "founding", mrr: 199, status: "active", health: "green", services: ["gbp_optimization", "booking_widget", "website_build"], months: 7, baseBookings: 35, implMonth: 3, implLift: 1.7 },
    { name: "Casa Limão", venue_type: "restaurant", plan: "pilot_3mo_half_price", mrr: 125, status: "onboarding", health: "amber", services: ["gbp_optimization"], months: 1, baseBookings: 12, implMonth: 0, implLift: 1 },
    { name: "Hotel Azulejo", venue_type: "hotel", plan: "standard", mrr: 349, status: "active", health: "red", services: ["booking_widget"], months: 9, baseBookings: 60, implMonth: 6, implLift: 0.7 },
    { name: "Norte Surf School", venue_type: "tour_operator", plan: "standard", mrr: 149, status: "churned", health: "red", services: ["booking_widget"], months: 5, baseBookings: 25, implMonth: 2, implLift: 0.9 },
  ];

  for (const c of clients) {
    const [row] = await sql`insert into clients ${sql({
      name: c.name,
      venue_type: c.venue_type,
      plan: c.plan,
      mrr_cents: c.mrr * 100,
      start_date: month(c.months),
      status: c.status,
      services: c.services,
      primary_contact: "Owner",
      notes: null,
    })} returning id`;
    const id = row.id as string;

    // Implementations: one mid-history change whose effect shows in figures.
    const shippedAt = month(c.months - c.implMonth);
    const verdict = c.implLift > 1.2 ? "working" : c.implLift < 1 ? "not_working" : "needs_changes";
    await sql`insert into implementations ${sql([
      {
        client_id: id,
        title: pick(["WhatsApp booking reminders", "Deposit on prime-time tables", "Homepage booking widget placement", "GBP profile overhaul"]),
        hypothesis: "Guests forget — well-timed nudges should cut no-shows and lift completed bookings.",
        target_metric: "bookings",
        shipped_at: shippedAt,
        review_due: month(Math.max(c.months - c.implMonth - 1, 0)),
        status: c.status === "onboarding" ? "planned" : verdict,
        outcome_notes: c.status === "onboarding" ? null : verdict === "working" ? "Clear lift in completed bookings within the first month." : verdict === "not_working" ? "No measurable change; guests ignore the prompt." : "Helps slightly, copy needs another pass.",
      },
      {
        client_id: id,
        title: "Pre-arrival preferences email",
        hypothesis: "Collecting preferences early improves reviews and repeat visits.",
        target_metric: "repeat_rate",
        shipped_at: c.months > 2 ? month(1) : null,
        review_due: month(0),
        status: c.months > 2 ? "shipped" : "planned",
        outcome_notes: null,
      },
    ])}`;

    // Monthly figures with an inflection at the implementation month.
    const figures = [];
    for (let m = c.months; m >= 0; m--) {
      const monthsSinceImpl = c.implMonth - m;
      const lift = monthsSinceImpl >= 0 ? c.implLift : 1;
      const churningDecay = c.status === "churned" && m < 2 ? 0.4 : 1;
      const bookings = Math.round(c.baseBookings * lift * churningDecay * (0.9 + rand() * 0.25));
      figures.push({
        client_id: id,
        month: month(m),
        bookings,
        widget_sessions: Math.round(bookings * (4 + rand() * 3)),
        no_shows: Math.round(bookings * (lift > 1.2 && monthsSinceImpl >= 0 ? 0.04 : 0.11) * (0.7 + rand() * 0.6)),
        cancellations: Math.round(bookings * 0.07),
        covers_or_guests: Math.round(bookings * (c.venue_type === "restaurant" ? 3.1 : 1.6)),
        direct_share_pct: Math.min(95, Math.round(30 + (c.months - m) * 3 + (monthsSinceImpl >= 0 ? 8 : 0))),
        venue_dashboard_logins: c.health === "red" ? intBetween(0, 3) : intBetween(6, 22),
        support_tickets: c.health === "red" ? intBetween(3, 7) : intBetween(0, 2),
      });
    }
    await sql`insert into monthly_figures ${sql(figures)}`;

    // Health history + touchpoints.
    if (c.health !== "green") {
      await sql`insert into health_assessments ${sql({
        client_id: id,
        rag: c.health,
        usage_trend: "down",
        sentiment: c.health === "red" ? 3 : 5,
        payment_ok: c.health !== "red",
        reason: c.health === "red" ? "Bookings down two months straight; staff stopped logging in; invoice overdue." : "Usage flat and owner has gone quiet since May.",
        next_action: c.health === "red" ? "On-site visit this week — rescue plan or graceful exit." : "Call this week; propose reminder-copy revision.",
      })}`;
    } else if (c.status === "active") {
      await sql`insert into health_assessments ${sql({
        client_id: id, rag: "green", usage_trend: "up", sentiment: intBetween(7, 9), payment_ok: true,
        reason: "Steady growth, happy on last call.", next_action: null,
      })}`;
    }

    const touchpoints = Array.from({ length: intBetween(2, 5) }, () => ({
      client_id: id,
      kind: pick(["call", "email", "visit", "whatsapp"]),
      summary: pick([
        "Monthly check-in — walked through last month's numbers.",
        "Owner asked about gift vouchers; logged as feature interest.",
        "Reviewed no-show trend after reminders went live.",
        "Quick WhatsApp: confirmed Saturday capacity change.",
      ]),
      occurred_at: new Date(now - intBetween(c.health === "red" ? 25 : 1, c.health === "red" ? 45 : 18) * 86_400_000),
    }));
    await sql`insert into touchpoints ${sql(touchpoints)}`;
  }

  const [{ count }] = await sql`select count(*) from events`;
  console.log(`Done. events=${count}, leads=${leadRows.length}, clients=${clients.length}`);
  await sql.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
