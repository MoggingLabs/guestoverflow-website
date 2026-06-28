# GuestOverflow — Portugal Pricing, Cost-to-Serve & Market Reality (June 2026)

Research method: a fleet of 9 agents ran live web research (2026-06-16) on **(A) our actual cost-to-serve in Portugal** and **(B) what Portuguese businesses actually pay**, to ground sector pricing. Companion to `competitor-research-2026-06.md` (the broader EU/global competitor deep-dive). **We target Portuguese businesses only for now**, so everything here is PT-market, EUR, and prices are quoted **ex-IVA** (PT B2B convention; IVA 23%, reclaimable by registered businesses).

> All figures are sourced estimates observed 2026-06-16; treat ±15% and re-verify before contract/launch. € numbers below are inputs to pricing, not final SKUs — founder sign-off required.

---

## 1. Cost-to-serve (what pricing must CLEAR)

### Infrastructure ≈ free at the margin
The stack is a Next.js 16 standalone Docker image + self-hosted Postgres container, Cloudflare in front, GHCR+SSH CD.
- **Recommended bootstrap:** Hetzner CX33 (€6.49/mo) running app + Postgres, Cloudflare Free (zero per-GB egress on any plan), Resend free tier, off-box DB backups to S3-compatible storage.
- **Fixed platform cost: ~€10–15/mo.** **Marginal cost per venue: < €0.10/mo** (Cloudflare-for-SaaS custom hostnames free to 100 venues, then ~€0.09/venue).
- Scales cheaply: ~€16–20/mo total at 50 venues (~€0.35/venue), ~€55–75/mo at 200 venues (~€0.30/venue). Split Postgres onto its own box / managed PG around 150–250 venues.
- **Conclusion:** infra is not a pricing constraint; per-venue subscription is set on value, not infra cost. (Watch: Hetzner raised prices 3× in 2026; venue domain registration if we do it for them.)

### Communications — SMS is the only real per-message cost
- **Email ≈ free:** Resend free 3,000/mo, then ~€0.0004–0.001/email. Bundle it, unmetered.
- **SMS to PT mobiles: ~€0.05/SMS** (Twilio list €0.046; cheaper PT gateways LabsMobile €0.014 / SMSonline.pt €0.025–0.036; Sinch €0.039). **Accented PT text forces 70-char UCS-2 segments → often 2 segments → ~2× cost.** Alphanumeric sender ID supported in PT (confirm pre-registration with chosen provider).
- Per-venue SMS at 50/150/400 bookings/mo ≈ **€4 / €11 / €30** (hybrid: email confirmation + ~1.5 SMS reminders/booking). Spread is ~4× by gateway/encoding.
- **WhatsApp (future):** utility templates ~€0.016/msg for PT (~⅓ of SMS), free inside the 24h service window — the cost-efficient future channel.
- **Decision:** email bundled; **SMS = opt-in metered add-on with a small per-tier allowance**, then transparent overage (~€0.08–0.10) — avoids both nickel-and-diming and margin bleed.

### Labor — the real floor (PT, fully loaded)
- PT employer social security **23.75%**; employees paid 14 months; meal subsidy. Founder draw modeled ~€25/hr loaded; junior support ~€14/hr loaded (recibos verdes ≈14.98% effective SS, first 12 months exempt).
- **Per venue:** onboarding 6–10 hrs one-off ≈ **€100–160** (use €130); quarterly review ~1.75 hrs ×4/yr; support ~1 hr/mo. → **recurring marginal labor ~€35/venue/mo**.
- **Fully-loaded cost-to-serve** (fixed founder/ops time spread): ~€240–450/venue at 5 venues → **~€55–75 at 50–100 venues**.
- **Stripe runs on the venue's own account → €0 payment cost to us** (we can truthfully say "no extra take-rate"). Context: Stripe EEA ~1.5% + €0.25.
- Business overhead (accountant/avença €100–350, tooling, misc): ~€300–900/mo fixed.
- **Upsells are high-margin:** website build internal cost €120–280 (PT market price €250–6,000); GBP optimization €30–60 internal (market €90–460 one-off). 60–80% margin.

### Structural consequence for the pricing ladder
- **Self-serve Starter (no concierge)** cost ≈ €0–5/venue → **€25–39 is margin-positive from venue #1.**
- **Concierge tiers carry the ~€35 labor floor** → must sit **≥ ~€59–99** to hold healthy margin. This shapes the ladder.

---

## 2. Portuguese willingness-to-pay (what pricing must FIT)

- PT minimum wage 2026 ~€920 gross/~€819 net; median ~€1,000–1,050/mo. Restaurant margins thin (~10–15%) and worsening (2024 hospitality insolvencies +~65%). Price sensitivity is real.
- **PT entry SaaS clusters €6–42/mo**, enterprise tiers €60–119: **Zappy €16–119**, Vendus (POS) €6–22, Moloni €3.50–16, Avaibook (AL) €23, Vezpa (AL) €39.
- **Display ex-IVA** ("acresce IVA à taxa legal") — every PT tool does; B2B buyers compare ex-IVA.
- **Annual billing is the norm**, discounted ~25–35% (our existing "a third off" fits). Founding/early-adopter discounting is well-tolerated.
- **Grant angle:** *Vale Digitalização* (Portugal 2030, up to 75%, open through Dec 2026) and PRR digital vouchers (≤€2,000) can fund **implementation + website/digital-presence** (likely not recurring SaaS) — position onboarding/website builds as grant-eligible; partner with a contabilista to file.

### Per-sector WTP (PT)
| Sector | Realistic monthly WTP (ex-IVA) | Notes |
|---|---|---|
| Salons & barbers | **€15–35** | Most price-sensitive; Zappy €16–33 is the anchor; per-seat rivals (Booksy) effectively €80–250 at volume |
| Spas & wellness | **€40–80** | Higher ticket; Phorest/Mindbody €99+ serve a thin premium slice |
| Restaurants | **€30–70 micro / €80–200 mid-market** | 91% are microbusinesses; mid-market pays TheFork real commission |
| Hotels — AL micro (1–3 units) | **€15–40** | Lodgify €13 floor; RoomRaccoon markets "100% sem comissão" |
| Hotels — boutique (10–30 rooms) | **€99–300** | Tolerated because Booking 15–18% = €50k+/yr on a 20-room property |
| Tours & experiences | **€40–120 / €150–300 established** | Small/seasonal; Civitatis is the key (Iberian) marketplace |

---

## 3. The per-sector commission story (why prices differ)

**Strong commission villain → ROI justifies higher price:**
- **Restaurants:** TheFork (dominant in PT) ~€2/cover standard, €3–4 on promos, **including repeat guests** + opaque subscription; can be >€1,000/mo at volume. PT restaurateurs already pay diners to "settle off-platform" to dodge it (documented on leak.pt). CoverManager (Spanish, merged w/ Zenchef) €60–250 is the commission-free peer; Mygon (PT-local) nickel-and-dimes via €9.90 add-ons. OpenTable & Quandoo are non-factors in PT.
- **Hotels/AL:** Booking.com overwhelmingly dominant, **15–18% commission**; 12,000+ EU hotels (APHORT promoting in PT) suing over parity clauses (~30% overcharge estimate). PMS lock-in (Mews 2-yr) + opaque/quote pricing + separate payment take-rates. 126,320 AL units (Faro/Lisboa/Porto) — a huge under-tooled long tail.
- **Tours:** Civitatis (Iberian, the most PT-relevant), GetYourGuide (30%), Viator (20–30%) take 20–30%/ticket and own the customer. FareHarbor 6% guest-paid (brand-damaging), Bokun bills even on cancellations. CaptainBook (€49, 0% direct) is the closest model.

**Weak commission villain → price fight, not ROI:**
- **Spas & salons:** the dominant rival **Zappy (Porto) is already commission-free and €16–33/mo** (verified: STAR €16→PRO €33→UNLIMITED €99, banded by # providers; add-ons branded app €29, invoicing €6.50–12, GDPR €4, extra location €10 → real "all-in" ~€60). We **cannot out-ROI Zappy on commission.** We win on: **no-show protection** (Zappy has only manual prepay — no card tokenization / auto no-show charge), **guest self-service** (My Zappy app 3.3/5; *self-cancel was removed* — the #1 PT user complaint, verified late-2025 App Store reviews), **true on-domain white-label** (Zappy's branded app is a €29 upsell; booking is a hosted link/iframe), and **concierge + flat per-venue** (Zappy is per-provider/equipment). Marketplace players in PT: Fresha (€12.95/staff + ~20% new-client), Treatwell (25% new-client / 0% repeat), Booksy ($29.99 + $20/seat + 30% first visit).

---

## 4. Recommended PT-calibrated pricing (adopted; founder to confirm numbers)

Ex-IVA, monthly; annual ≈ −30%. **Hybrid ladder:** self-serve Starter for the price-sensitive micro segment; concierge Essential/Premium for the commission-bleeding mid-market.

| Sector | Starter (self-serve) | Essential (concierge) | Premium | Custom (from) | Value-unit |
|---|---|---|---|---|---|
| Restaurants | €39 | €89 | €199 | from €349 | covers/mo |
| Hotels | €79 | €129 | €279 | Custom (quoted) | room-nights / Booking % saved |
| Spas & wellness | €39 | €79 | €149 | from €299 | first-visit commission + per-seat |
| Salons & barbers | €25 | €59 | €119 | from €249 | per-chair fees + first-visit commission |
| Tours & experiences | €39 | €99 | €189 | from €349 | per-ticket commission saved |

Cross-cutting: free 14-day no-card trial all sectors; founding-cohort discount (~30–50% off, locked 12 months); flat per-venue everywhere (never per-seat/per-location); SMS metered add-on with allowance; onboarding/website positioned as grant-eligible.

---

## 5. Key sourced anchors
- **Infra:** Hetzner CX33 €6.49 (costgoat.com/pricing/hetzner); Cloudflare Free zero-egress + Cloudflare-for-SaaS first 100 hostnames free (developers.cloudflare.com); .pt ~€10–17/yr (pt.pt).
- **SMS:** Twilio PT €0.046 (twilio.com/sms/pricing/pt); LabsMobile PT from €0.014; SMSonline.pt €0.025–0.036; WhatsApp PT utility ~€0.016 (whautomate.com).
- **Labor/PT:** employer SS 23.75% (pwc.pt 2026 tax guide); CS salary ~€1,200–1,330 (Glassdoor Lisbon); Stripe EEA 1.5%+€0.25 (stripe.com/en-pt/pricing).
- **WTP/competitors:** Zappy pricing (zappysoftware.com/pricing) + My Zappy 3.3/5 (apps.apple.com/pt); Fresha (fresha.com/pricing); Treatwell PT 25% (treatwell.pt/partners/precos); TheFork PT (theforkmanager.com/pt-pt/planos; leak.pt); Booking 15–18% (dphotelsolutions.pt; ambitur.pt) + EU lawsuit (jornaleconomico.sapo.pt); AL 126,320 units (publico.pt/idealista.pt); Lodgify €13 (lodgify.com); Civitatis/GYG/Viator commissions (checkfront.com; regiondo.com; civitatis.com providers FAQ); CaptainBook €49 0%-direct (captainbook.io); Vendus €6–22 (vendus.pt/planos-precos); Vale Digitalização (pmeincentivos.pt).

> Some PT-language voice-of-customer quotes could not be isolated (Reclame Aqui results were Brazilian; PT Livro de Reclamações not text-searchable). Zappy App Store complaints and TheFork/Booking commission mechanics are well-verified; restaurateur-association anti-commission statements were not found and are inferred. Exact subscription € for quote-gated tools (TheFork, CoverManager, Mygon, Host, Newhotel, Civitatis) are not public.
