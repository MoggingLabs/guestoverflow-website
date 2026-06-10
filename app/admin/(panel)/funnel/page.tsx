import { FunnelBars } from "@/components/admin/charts/FunnelBars";
import { RangePicker } from "@/components/admin/RangePicker";
import { parseRange } from "@/lib/admin/range";
import { funnel, type FunnelRow } from "@/lib/admin/queries";

const STAGES: { key: keyof FunnelRow; label: string }[] = [
  { key: "landed", label: "Landed" },
  { key: "engaged", label: "Engaged (10s or 50% scroll)" },
  { key: "widget_opened", label: "Tried the booking demo" },
  { key: "widget_completed", label: "Completed a demo booking" },
  { key: "form_started", label: "Started the demo form" },
  { key: "form_submitted", label: "Submitted the demo form" },
];

function SplitTable({ rows, heading }: { rows: FunnelRow[]; heading: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
      <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
        {heading}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-cream-faint">No data in this range.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-cream-faint">
              <th className="pb-2 font-medium">Segment</th>
              <th className="pb-2 text-right font-medium">Landed</th>
              <th className="pb-2 text-right font-medium">Engaged</th>
              <th className="pb-2 text-right font-medium">Demo</th>
              <th className="pb-2 text-right font-medium">Form</th>
              <th className="pb-2 text-right font-medium">Submitted</th>
              <th className="pb-2 text-right font-medium">Conv.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.slice(0, 10).map((row) => {
              const conv =
                Number(row.landed) > 0
                  ? ((Number(row.form_submitted) / Number(row.landed)) * 100).toFixed(1)
                  : "0.0";
              return (
                <tr key={row.segment}>
                  <td className="max-w-40 truncate py-2.5 text-cream">
                    {row.segment}
                  </td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {Number(row.landed).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {Number(row.engaged).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {Number(row.widget_opened).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {Number(row.form_started).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right text-cream-dim">
                    {Number(row.form_submitted).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right text-amber">{conv}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default async function AdminFunnelPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { key, from, to } = parseRange((await searchParams).range);

  const [overall, bySource, byDevice] = await Promise.all([
    funnel(from, to),
    funnel(from, to, "source"),
    funnel(from, to, "device"),
  ]);
  const total = overall[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-cream">
          Funnel
        </h1>
        <RangePicker active={key} basePath="/admin/funnel" />
      </div>

      <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-cream-faint">
          Where visitors drop off ({key})
        </h2>
        <FunnelBars
          stages={STAGES.map((stage) => ({
            label: stage.label,
            value: total ? Number(total[stage.key]) : 0,
          }))}
        />
      </div>

      <SplitTable rows={bySource} heading="By traffic source" />
      <SplitTable rows={byDevice} heading="By device" />
    </div>
  );
}
