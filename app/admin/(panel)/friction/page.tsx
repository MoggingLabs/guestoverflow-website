import { HBarList } from "@/components/admin/charts/HBarList";
import { StatCard } from "@/components/admin/charts/StatCard";
import { RangePicker } from "@/components/admin/RangePicker";
import { parseRange } from "@/lib/admin/range";
import {
  errorGroups,
  fieldFunnel,
  formAbandons,
  rageClicks,
} from "@/lib/admin/queries";
import { cn } from "@/lib/utils";

export default async function AdminFrictionPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { key, from, to } = parseRange((await searchParams).range);

  const [rage, fields, abandons, errors] = await Promise.all([
    rageClicks(from, to),
    fieldFunnel(from, to),
    formAbandons(from, to),
    errorGroups(from, to),
  ]);

  const formErrors = errors.filter((e) => e.event === "demo_form_error");
  const jsErrors = errors.filter((e) => e.event === "js_error");
  const possiblyLostLeads = formErrors.reduce(
    (sum, e) => sum + Number(e.occurrences),
    0,
  );
  const totalAbandons = abandons.reduce(
    (sum, a) => sum + Number(a.abandons),
    0,
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-cream">
          Friction
        </h1>
        <RangePicker active={key} basePath="/admin/friction" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Possible lost leads"
          value={possiblyLostLeads}
          hint="Demo form submissions that errored"
        />
        <StatCard
          label="Form abandons"
          value={totalAbandons}
          hint="Started the form, left the page"
        />
        <StatCard
          label="Rage click hotspots"
          value={rage.length}
          hint="Distinct elements clicked in frustration"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HBarList
          title="Form fields completed (median hesitation)"
          rows={fields.map((f) => ({
            label: f.field,
            value: Number(f.sessions_completed),
            detail: f.median_hesitation_ms
              ? `${(Number(f.median_hesitation_ms) / 1000).toFixed(1)}s`
              : undefined,
          }))}
        />
        <HBarList
          title="Last field before abandoning"
          rows={abandons.map((a) => ({
            label: a.last_field,
            value: Number(a.abandons),
          }))}
        />
      </div>

      <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
          Rage clicks
        </h2>
        {rage.length === 0 ? (
          <p className="text-sm text-cream-faint">
            None recorded. Nothing is visibly frustrating visitors.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-cream-faint">
                <th className="pb-2 font-medium">Element</th>
                <th className="pb-2 font-medium">Page</th>
                <th className="pb-2 text-right font-medium">Times</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rage.map((r) => (
                <tr key={`${r.selector}-${r.url_path}`}>
                  <td className="max-w-md truncate py-2.5 font-mono text-xs text-cream">
                    {r.selector}
                  </td>
                  <td className="py-2.5 text-cream-dim">{r.url_path}</td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {r.occurrences}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
          Errors: is anything being lost?
        </h2>
        {errors.length === 0 ? (
          <p className="text-sm text-cream-faint">
            No JavaScript or form errors recorded in this range.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-cream-faint">
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Message</th>
                <th className="pb-2 font-medium">Page</th>
                <th className="pb-2 text-right font-medium">Times</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[...formErrors, ...jsErrors].map((e) => (
                <tr key={`${e.event}-${e.message}`}>
                  <td
                    className={cn(
                      "py-2.5 text-xs font-medium",
                      e.event === "demo_form_error"
                        ? "text-error"
                        : "text-cream-dim",
                    )}
                  >
                    {e.event === "demo_form_error" ? "FORM" : "JS"}
                  </td>
                  <td className="max-w-md truncate py-2.5 text-cream">
                    {e.message}
                  </td>
                  <td className="py-2.5 text-cream-dim">{e.sample_path}</td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {e.occurrences}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
