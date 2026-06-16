"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CostCurveChart, type CostSeries } from "./CostCurveChart";
import {
  calculatorContent,
  sectorCalculators,
  feeSectors,
  type CommissionModel,
  type FeeSector,
} from "@/content/competitors";
import { sectorPrices } from "@/content/industries";
import { siteStrings } from "@/content/site";
import { useLocale } from "@/lib/locale-client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ANNUAL_FACTOR = 2 / 3;
const REPEAT_SHARE = 0.5; // research: 40–60% of guests are repeat
const PALETTE = [
  "var(--color-error)",
  "var(--color-champagne)",
  "var(--color-navy-soft)",
];

function feePerUnit(
  m: CommissionModel,
  avgTicket: number,
  side: "low" | "high" | "mid",
): number {
  const lo = m.perUnitLow ?? (m.pctLow ?? 0) * avgTicket;
  const hi = m.perUnitHigh ?? (m.pctHigh ?? 0) * avgTicket;
  if (side === "low") return lo;
  if (side === "high") return hi;
  return (lo + hi) / 2;
}

function monthlyCost(m: CommissionModel, x: number, avgTicket: number): number {
  return (m.fixedMonthly ?? 0) + x * feePerUnit(m, avgTicket, "mid");
}

export function CostCalculator({
  initialSector = "restaurants",
  compact = false,
}: {
  initialSector?: FeeSector;
  compact?: boolean;
}) {
  const locale = useLocale();
  const c = calculatorContent[locale];
  const demoCta = siteStrings[locale].cta.primary;

  const [sector, setSector] = useState<FeeSector>(initialSector);
  const calc = sectorCalculators[sector];
  const [volume, setVolume] = useState(calc.volumeDefault);
  const [avgTicket, setAvgTicket] = useState(calc.avgTicketEur);
  const [tier, setTier] = useState<"essential" | "premium">("essential");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selected, setSelected] = useState<string[]>(
    calc.competitors.map((m) => m.id),
  );

  // one calculator_opened per mount
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    track("calculator_opened", { sector });
  }, [sector]);

  // debounce volume tracking
  const volTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function onVolume(next: number) {
    setVolume(next);
    if (volTimer.current) clearTimeout(volTimer.current);
    volTimer.current = setTimeout(() => {
      track("calculator_changed", { sector, volume: next });
    }, 600);
  }

  function changeSector(next: FeeSector) {
    const nc = sectorCalculators[next];
    setSector(next);
    setVolume(nc.volumeDefault);
    setAvgTicket(nc.avgTicketEur);
    setSelected(nc.competitors.map((m) => m.id));
    track("calculator_changed", { sector: next });
  }

  function toggleCompetitor(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const prices = sectorPrices[sector];
  const goBase = tier === "premium" ? prices.premium : prices.essential;
  const goMonthly = billing === "annual" ? Math.round(goBase * ANNUAL_FACTOR) : goBase;

  const usesPct = calc.competitors.some(
    (m) => m.pctLow != null && selected.includes(m.id),
  );
  const activeCompetitors = calc.competitors.filter((m) => selected.includes(m.id));

  const euro = new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const num = new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-IE");
  const unit = c.unit[sector];
  const unitPlural = c.unitPlural[sector];

  const series: CostSeries[] = [
    {
      id: "go",
      label: c.goLineLabel,
      color: "var(--color-amber)",
      dashed: true,
      valueAt: () => goMonthly,
    },
    ...activeCompetitors.map((m, i) => ({
      id: m.id,
      label: m.name,
      color: PALETTE[i % PALETTE.length],
      valueAt: (x: number) => monthlyCost(m, x, avgTicket),
    })),
  ];

  // break-even against the most expensive selected competitor
  const beComp = [...activeCompetitors].sort(
    (a, b) => feePerUnit(b, avgTicket, "mid") - feePerUnit(a, avgTicket, "mid"),
  )[0];
  const beFee = beComp ? feePerUnit(beComp, avgTicket, "mid") : 0;
  const beEssential = beFee > 0 ? Math.max(1, Math.round(prices.essential / beFee)) : 0;
  const bePremium = beFee > 0 ? Math.max(1, Math.round(prices.premium / beFee)) : 0;

  const goAnnual = goMonthly * 12;

  function feeLabel(m: CommissionModel): string {
    if (m.perUnitLow != null) {
      const lo = euro.format(m.perUnitLow);
      const hi = euro.format(m.perUnitHigh ?? m.perUnitLow);
      return c.perUnitFee(lo === hi ? lo : `${lo}–${hi}`, unit);
    }
    const lo = Math.round((m.pctLow ?? 0) * 100);
    const hi = Math.round((m.pctHigh ?? m.pctLow ?? 0) * 100);
    return c.pctFee(lo === hi ? `${lo}%` : `${lo}–${hi}%`);
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6 shadow-card md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Controls */}
        <div>
          {/* Sector */}
          <label className="text-xs font-medium uppercase tracking-[0.15em] text-amber">
            {c.sectorLabel}
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {feeSectors.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => changeSector(s)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm transition-colors",
                  s === sector
                    ? "border-amber-deep bg-amber text-white"
                    : "border-line text-cream-dim hover:text-cream",
                )}
              >
                {c.sectorNames[s]}
              </button>
            ))}
          </div>

          {/* Volume */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <label htmlFor="gv-volume" className="text-sm text-cream-dim">
                {c.volumeLabel(unitPlural)}
              </label>
              <span className="font-display text-lg font-medium text-cream">
                {num.format(volume)}
              </span>
            </div>
            <input
              id="gv-volume"
              type="range"
              min={calc.volumeMin}
              max={calc.volumeMax}
              step={calc.volumeStep}
              value={volume}
              onChange={(e) => onVolume(Number(e.target.value))}
              className="mt-2 w-full accent-amber"
            />
          </div>

          {/* Avg ticket (only relevant for % models) */}
          {usesPct && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <label htmlFor="gv-ticket" className="text-sm text-cream-dim">
                  {c.avgTicketLabel}
                </label>
                <span className="text-sm text-cream">{euro.format(avgTicket)}</span>
              </div>
              <input
                id="gv-ticket"
                type="range"
                min={10}
                max={300}
                step={5}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="mt-2 w-full accent-amber"
              />
            </div>
          )}

          {/* Tier + billing */}
          <div className="mt-7 flex flex-wrap gap-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-amber">
                {c.tierLabel}
              </span>
              <div className="mt-2 inline-flex rounded-md border border-line p-1">
                {(["essential", "premium"] as const).map((tk) => (
                  <button
                    key={tk}
                    type="button"
                    onClick={() => setTier(tk)}
                    className={cn(
                      "rounded px-3 py-1 text-sm capitalize transition-colors",
                      tier === tk
                        ? "bg-amber font-medium text-white"
                        : "text-cream-dim hover:text-cream",
                    )}
                  >
                    {tk}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-amber">
                &nbsp;
              </span>
              <div className="mt-2 inline-flex rounded-md border border-line p-1">
                {(["monthly", "annual"] as const).map((bk) => (
                  <button
                    key={bk}
                    type="button"
                    onClick={() => setBilling(bk)}
                    className={cn(
                      "rounded px-3 py-1 text-sm transition-colors",
                      billing === bk
                        ? "bg-amber font-medium text-white"
                        : "text-cream-dim hover:text-cream",
                    )}
                  >
                    {bk === "monthly" ? c.billingMonthly : c.billingAnnual}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor toggles */}
          <div className="mt-6 space-y-2">
            {calc.competitors.map((m) => (
              <label
                key={m.id}
                className="flex items-center gap-2.5 text-sm text-cream-dim"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={() => toggleCompetitor(m.id)}
                  className="accent-amber"
                />
                <span className="text-cream">{m.name}</span>
                <span className="text-cream-faint">({feeLabel(m)})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Output */}
        <div>
          <CostCurveChart
            maxX={calc.volumeMax}
            currentX={volume}
            series={series}
            formatY={(v) => euro.format(v)}
            formatX={(v) => num.format(v)}
          />

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-amber">
            {c.savingsHeading}
          </p>
          <p className="mt-1 text-sm text-cream-dim">{c.flatYou(euro.format(goMonthly))}</p>

          <ul className="mt-3 space-y-3">
            {activeCompetitors.map((m) => {
              const annual = monthlyCost(m, volume, avgTicket) * 12;
              const save = annual - goAnnual;
              return (
                <li key={m.id} className="text-sm">
                  <p className="text-cream">
                    {save > 0
                      ? c.savesPerYear(euro.format(save), m.name)
                      : c.costsPerYear(euro.format(annual), m.name)}
                  </p>
                  {m.repeatGuestTax && annual > 0 && (
                    <p className="mt-0.5 text-xs text-cream-faint">
                      {c.repeatTax(euro.format(annual * REPEAT_SHARE))}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {beFee > 0 && (
            <div className="mt-4 rounded-md border border-line bg-raised p-4 text-sm text-cream-dim">
              <p>{c.breakEven("Essential", beEssential, unit)}</p>
              <p className="mt-1">{c.breakEven("Premium", bePremium, unit)}</p>
            </div>
          )}

          {!compact && (
            <div className="mt-6">
              <Button href={demoCta.href} analyticsLabel="calculator_book_demo">
                {demoCta.label}
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-cream-faint">{c.disclaimer}</p>
    </div>
  );
}
