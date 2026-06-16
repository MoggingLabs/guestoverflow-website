# GuestOverflow — Competitive Deep-Dive (June 2026)

Research method: a fleet of ~36 agents ran live web research across **31 competitors** in 5 sectors
(restaurant booking, hotels, spa/wellness, tours/activities, generic appointments), capturing pricing,
business model, data-ownership, white-label reality, and real customer complaints from review sites and
forums. Findings were then synthesized through four lenses: proven patterns, exploitable gaps, product
recommendations, and pricing strategy.

---

## 1. Who is "Zappy"?

**Zappy (Zappy Software)** — a **Porto, Portugal** all-in-one online booking / appointment-scheduling
SaaS for local service businesses. **Market leader in Portugal for beauty/aesthetics.** It shares our
exact thesis — commission-free, embed-on-your-own-site, Portugal-born, PT-language support — but:

- **Core vertical is appointment-based services** (beauty, wellness, health, pet care), **NOT restaurants**.
- **Self-serve software, not concierge done-for-you.**
- **Priced far below us:** seat-based, STAR €20/mo (€16 annual) for one provider → UNLIMITED €119/mo
  (€99 annual) for 12+. Add-ons stacked on top (branded client app €29, invoicing €6.50–12, GDPR €4,
  extra location €10).
- **Weaknesses we can exploit:** client app only 3.3/5 (guests can't self-cancel/modify → forced phone
  calls; guests struggle to even find their salon in the shared "My Zappy" app); no clear deposit /
  card-guarantee no-show flow; true branded app is a paid upsell.

**Verdict:** Zappy overlaps our *spa/salon* prospects, not restaurants. Don't fight it head-on on price
in PT beauty — win on concierge setup, no-show protection (which it lacks), guest self-service, and true
on-domain white-label. Target restaurants/hotels/tours where Zappy is absent.

---

## 2. The competitive set (31 profiled)

**Direct restaurant-booking battlefield:** TheFork, OpenTable, Resy (Amex), SevenRooms (DoorDash), Zenchef,
Tock, ResDiary, Eat App, Tablein, Quandoo, Formitable (now Zenchef group), Superb.

**Closest same-thesis EU challengers (discovered):** resOS (Denmark), Tableo (Malta), Octotable (Italy),
Bouzon (Spain), CoverManager (Spain, merged with Zenchef July 2025).

**Cross-sector (adjacent verticals):**
- Hotels — Cloudbeds, Mews, Little Hotelier (SiteMinder)
- Spa/wellness — Zappy, Fresha, Treatwell, Mindbody, Booksy
- Tours/activities — FareHarbor, Rezdy, Bokun (TripAdvisor)
- Generic appointments — SimplyBook.me, Square Appointments

### Pricing & model at a glance

| Competitor | Sector | Model | Headline price | Per-cover/booking fee |
|---|---|---|---|---|
| **TheFork** | restaurant | hybrid marketplace | ~€29–159/mo + ~€400 setup | **€1.50–6/cover, incl. repeat guests** (€8.6k–35k/yr) |
| **OpenTable** | restaurant | hybrid marketplace | $149–499/mo | $1/network + $0.25/website cover + 2% txn |
| **Resy** | restaurant | flat (sales-gated) | ~$249–899/mo | none (≈3% on ticketing) |
| **SevenRooms** | restaurant | flat, modular | ~$499/mo per module (opaque) | none |
| **Zenchef** | restaurant | flat per location | ~€49–109+/mo (opaque) | none (2–4% card + per-SMS) |
| **Tock** | restaurant | hybrid (prepaid %) | $199–699/mo | 0–2% on prepaid |
| **ResDiary** | restaurant | flat by volume | ~£69 adv. / £154 billed | none (add-ons stacked) |
| **Eat App** | restaurant | flat by covers | $0 / $99 / $199 / $389 | none (add-ons: widget $19, CRM $39…) |
| **Tablein** | restaurant | flat + overage | €67 / €117 / €177 | €0.37–0.67/reservation overage |
| **Quandoo** | restaurant | hybrid (closing Dec 2026) | ~$39–99/mo + $99 setup | £2–3.90/cover |
| **Formitable** | restaurant | flat | ~€79/mo | €0.99–2.99 per *paid* booking |
| **Superb** | restaurant | flat + payments margin | €0 / Plus (gated) | none (0.9–1.29% payments) |
| **resOS** | restaurant | freemium flat | **free 25/mo**, ~€47/mo | none (add-ons paid) |
| **Tableo** | restaurant | freemium flat | **free ≤100 covers/mo**, ~€49/mo | none |
| **Octotable** | restaurant | freemium flat | **free 30/mo**, €23–59/mo | none |
| **Bouzon** | restaurant | flat (incl. website) | **~€59/mo all-in** | none |
| **CoverManager** | restaurant | flat (opaque) | €99–400+/mo, €200–500 onboarding | none |
| **Cloudbeds** | hotel | flat + payments % | quote (~$99+/mo) | ~1.4% + 1% FX payments |
| **Mews** | hotel | flat + payments % (2-yr lock-in) | quote | undisclosed % |
| **Little Hotelier** | hotel | flat + payments % | quote | undisclosed Pay % |
| **Fresha** | spa | freemium + marketplace % | free base | **20% new-client (min ~$6)** + processing |
| **Treatwell** | spa | subscription + marketplace % | ~€35/mo | **35%+VAT first booking** |
| **Mindbody** | spa | flat per location + marketplace % | quote (12-mo lock-in) | 20% marketplace (cap ~$30) + 2.75–3.6% |
| **Booksy** | spa | flat per seat + marketplace % | $29.99 + $20/seat | **30% first visit** |
| **FareHarbor** | tours | commission (guest-paid) | $0 software | **~6% guest-paid** |
| **Rezdy** | tours | flat + % | ~$49+/mo | 3%/booking |
| **Bokun** | tours | flat + % (changed 3x in 2yr) | varies | 1–1.5% (even on cancellations) |
| **SimplyBook.me** | generic | freemium, hard caps | free 50/mo, ~€11.90+ | none (60+ paid features, caps halt bookings) |
| **Square Appointments** | generic | free + payments % | free | 2.5–3.6% processing + fund holds |
| **Zappy** | spa | flat per seat + add-ons | €16–119/mo | none |
| **GuestOverflow (us)** | multi | **flat per venue, concierge** | **€99 / €249** | **none, ever** |

---

## 3. What is PROVEN to work (copy these)

1. **Commission-free flat pricing is the #1 adoption wedge.** Across every commission-free rival it's the
   stated reason customers switch. The pain it inverts is quantifiable and brutal: TheFork bills €1.50–6
   on *every* cover **including the 40–60% who are repeat guests** ("your most valuable guests become your
   most expensive acquisition channel"); OpenTable fees alone hit $21.6k–31.8k/yr at volume.
   → **Build a side-by-side cost-at-volume calculator.** At €2.50/cover, Essential €99 breaks even at ~40
   covers/mo, Premium €249 at ~100 covers/mo — trivially low for any real restaurant.

2. **"You own your guest data" — but make export a *contractual* one-click promise.** This is the second
   universal selling point, made a *winning* play by OpenTable literally amending its contract to **block**
   data export to rivals, and Fresha/Quandoo cases where data is non-exportable or owned by the platform.
   Several rivals (Tableo, Tablein) under-document export — a cheap defensible wedge.

3. **No-show protection (deposits + card guarantees) is non-negotiable table stakes.** Best practice =
   Stripe tokenization, free until a card is charged, run through the *venue's own* Stripe (no platform cut).
   **But avoid the no-show-fee backlash** that damaged Resy, Treatwell (~92% negative), Fresha, Booksy —
   transparent rules + fast clean refunds. Don't gate it to the top tier only.

4. **Done-for-you / concierge onboarding is a proven loyalty driver AND the antidote to the #1 complaint.**
   Painful self-serve onboarding is the most consistent negative across rivals (SevenRooms, ResDiary,
   Eat App, Mews, Cloudbeds). Where concierge exists (FareHarbor, Superb) it's the most-loved feature.
   Our **quarterly review** goes further than all of them (rivals gate quarterly reviews to Enterprise).

5. **True invisible white-label on the venue's own domain.** Marketplaces structurally can't match it; many
   "white-label" rivals charge extra (resOS, Eat App $19, SimplyBook.me top tier) or leak branding (Tock
   won't remove its logo). Make it **standard in the base tier.**

6. **Pricing transparency.** Most incumbents hide price behind a demo (TheFork, OpenTable, Resy, SevenRooms,
   Zenchef, CoverManager, Mews, Cloudbeds). Surprise costs are a top complaint. We already publish €99/€249 —
   weaponize "see our price, no sales call, no setup fee."

7. **No lock-in / easy exit.** Lock-in horror stories are everywhere (Mews 2-yr, Little Hotelier billed 14
   months ~$1,900 after cancelling, Zenchef forced full-year payments, Quandoo "debits after you quit").
   Our no-questions exit directly matches the winning posture — place it next to their horror stories.

8. **Reserve with Google** is now table-stakes commission-free distribution (used by Zenchef, ResDiary,
   Resy, Cloudbeds, resOS, Tablein, Octotable, Tableo, CoverManager…). Pairs with our GBP-optimization upsell.

9. **Fast, human, named support** is the most-praised attribute where rivals are loved (Tablein 5.0,
   FareHarbor 24/7) and the most-hated where they fail (Mindbody 3+ days, Cloudbeds "ticket black hole",
   Tock email-only). Founder-led concierge is a natural moat — guarantee response times in writing.

10. **All-in-one bundling** (booking + floor plan + CRM + reminders + analytics) — but **avoid the add-on
    nickel-and-diming** rivals are hated for.

---

## 4. GAPS we can exploit (their pain = our pitch)

- **Per-cover commission on your own repeat guests** — the single most-hated recurring pain (TheFork,
  OpenTable, Fresha 20%, Treatwell 35%, Mindbody 20%, Booksy 30%, FareHarbor 6%).
- **Opaque, quote-gated pricing** — near-universal and actively resented.
- **Add-on / module nickel-and-diming** makes "commission-free" or low headline price a lie at the real
  total (Zappy, ResDiary, Eat App, resOS, SimplyBook.me).
- **Poor / slow support after the sale** — the most consistent operational complaint across nearly all.
- **Contract lock-in & post-cancellation billing** breed deep distrust.
- **Data lock-in & marketplace ownership of the guest** — the structural villain (OpenTable export block,
  Fresha card data, Quandoo owns the diner, Mindbody sells data / routes your clients to competitors).
- **Most "white-label" rivals aren't truly invisible** — branding leaks via app, emails, or paid upsell.
- **Booking caps & per-seat pricing punish growth** (SimplyBook.me halts at caps, Tablein per-res overage,
  Booksy/Zappy per-seat, Mindbody per-location).
- **Clunky/buggy/dated UX** and unreliable booking flows (FareHarbor's 14-sec spinner dropped sales ~25%).
- **Hidden payment-processing take-rate** is the real undisclosed cost behind many "free"/"flat" tools
  (Superb, Cloudbeds, Mews, Square, Mindbody, Zenchef).
- **No competitor spans restaurants + hotels + spas + tours** — every rival is siloed. **Open white space.**
- **Time-boxed opportunity:** **Quandoo is shutting down** (new bookings end Sept 2026, full shutdown Dec
  2026, no buyer). Its terms mean restaurants *lose* their guest data. Run a "Quandoo is closing — keep
  your bookings *and* your guest data" migration campaign with free done-for-you export/import **now**.

### The one honest gap
We **cannot** generate net-new *discovery demand* the way marketplaces do — which is exactly why venues
tolerate hated fees. **Don't pretend to replace it.** Position for venues that already have demand
(direct/repeat/walk-in) and answer discovery with **Reserve with Google + our GBP optimization + website
builds**. Honesty here is a credibility wedge.

---

## 5. PRODUCT roadmap to be the better product

**Build-priority (high):**
1. **Truly invisible white-label by default** — zero GO branding in widget, checkout, emails, SMS; both tiers.
2. **No-show protection via the venue's own Stripe** — deposits, card guarantees, configurable rules,
   transparent fast refunds; bundled in Premium, never a per-transaction surcharge.
3. **One-click full guest-data export (CSV + JSON)** + easy **import from competitors** (TheFork/OpenTable/
   Fresha/CoverManager) to win switchers; contractual, in-product.
4. **Genuinely flat all-inclusive pricing engine** — no booking caps, no overage, essentials bundled.
5. **Multi-vertical booking engine** — real restaurant covers + spa treatment packages/session counting +
   hotel room-nights + tour capacity/manifests. **This breadth is our structural moat.** Prioritize spa +
   tours templates (served only by commission-taking marketplaces).
6. **Fast mobile-first guest flow** with self-cancel/reschedule (no forced account), "next available slot"
   search, sub-second widget.

**Medium:**
7. Floor/table + resource management + guest CRM (tags, history, allergies, **reservation-source tracking**
   — an explicit unmet "wins-deals" request in Eat App).
8. Reserve with Google + a **venue-owned** repeat-guest loyalty layer (counters cross-venue programs that
   poach your guests).
9. **In-product commission-savings calculator** + **automated quarterly no-show/repeat-guest report**
   powering the founder review (no rival offers this in standard tiers).
10. Reliability + clean multi-tenant isolation as engineered, marketed features; stay POS/processor-agnostic.

**Low / future:** AI phone + WhatsApp booking assistant (EN/PT) as a Premium/Custom hook — CoverManager,
Octotable, Zenchef are already shipping AI voice.

---

## 6. PRICING strategy verdict

**Keep the flat, commission-free core — do not reprice it down.** The ROI math wins decisively above
~40–100 covers/mo. Lead with the cover-volume break-even calculator and the "stop paying €2–6 every time
*your* regular comes back" frame.

But two real exposures:

1. **Essential €99 is undercut at the entry point.** Direct same-thesis EU rivals sit well below with **free
   tiers**: resOS (free 25/mo, ~€47), Tableo (free ≤100 covers), Octotable (free 30/mo, €23–59), Bouzon
   (~€59 all-in *including a website*). A price-shopping independent lands on these first.
   **Recommendation — don't cut €99.** Instead:
   - Add a **genuine free or no-card trial tier** (the single most-replicated winning funnel tactic).
   - Consider a **self-serve "Starter" ~€49–59/mo** for venues that don't need full concierge, so the first
     quote isn't lost on price.
   - **Reframe €99 as "a partner who builds, installs and optimizes it for you," not software** — on
     software-only price we lose; on done-for-you + quarterly reviews we win.

2. **Premium €249 is well-placed** — undercuts Resy (~$249, US-only, not white-label), SevenRooms (~$499/
   module), Tock ($199–699), Eat App Pro (~€360 before add-ons) while *including* concierge they lack. No cut needed.

**Make "all-in" actually all-in:** guarantee "no surprise add-on fees — the quoted price is the real price,"
and ensure Premium bundles deposits + card guarantees + analytics + white-label + an SMS allowance.
Deposits via the venue's own Stripe → **"no commission AND no payment take-rate, keep your processor, get
your money fast"** — beats Superb/Mindbody/Square/Cloudbeds whose cheap subscriptions are subsidized by a
0.9–3.6% processing margin.

**Top tier:** keep Custom but **publish a starting price** and a **flat-per-venue** (not per-location-penalty)
structure for 2nd+ locations — exploits the "per-location pricing punishes growth" complaint against
Mindbody/Cloudbeds/Little Hotelier and retains accounts SevenRooms would otherwise upsell.

**Spa/wellness (vs Zappy):** do **not** chase Zappy's €16–20 entry head-on. Keep flat per-venue (beats
per-seat that "punishes a 5-chair shop"), and justify the premium with concierge + no-show protection
(Zappy lacks it) + guest self-service (Zappy app 3.3/5) + true on-domain white-label.

**Trust levers that cost nothing:** keep no-lock-in / no-questions-exit prominent and **add a written "we
never raise your rate out from under you / grandfather existing customers" commitment** to exploit
Cloudbeds/Bokun price-hike anger.

---

## 7. The five sharpest moves

1. **Cost-at-volume calculator** front-and-center (flat line vs rising commission line), with the
   repeat-guest tax called out by name.
2. **Add a free / no-card trial** (and consider a €49–59 self-serve Starter) to fix the funnel gap vs
   resOS/Tableo/Octotable/Bouzon — without cutting €99.
3. **Quandoo migration campaign** before Dec 2026 — free done-for-you export/import; the perfect proof of
   our whole thesis.
4. **Multi-vertical (restaurant + hotel + spa + tours) one white-label widget** — the white space nobody owns.
5. **Contractual promises as marketing:** one-click data export, no per-cover ever, no payment take-rate,
   no surprise add-ons, no rate hikes, no-questions exit — each mapped to a named competitor's failure.
