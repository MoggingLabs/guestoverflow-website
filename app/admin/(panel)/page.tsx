import { StatCard } from "@/components/admin/charts/StatCard";
import { TrendLine } from "@/components/admin/charts/TrendLine";
import { HBarList } from "@/components/admin/charts/HBarList";
import { RangePicker } from "@/components/admin/RangePicker";
import { parseRange } from "@/lib/admin/range";
import {
  countries,
  dailyVisitors,
  devices,
  recentSessions,
  topPages,
  topSources,
} from "@/lib/admin/queries";

function ago(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { key, from, to } = parseRange((await searchParams).range);

  const [daily, pages, sources, geo, devs, sessions] = await Promise.all([
    dailyVisitors(from, to),
    topPages(from, to),
    topSources(from, to),
    countries(from, to),
    devices(from, to),
    recentSessions(),
  ]);

  const totalVisitors = daily.reduce((sum, d) => sum + Number(d.visitors), 0);
  const totalSessions = daily.reduce((sum, d) => sum + Number(d.sessions), 0);
  const totalViews = daily.reduce((sum, d) => sum + Number(d.page_views), 0);
  const today = daily.at(-1);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-cream">
          Overview
        </h1>
        <RangePicker active={key} basePath="/admin" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Visitors today"
          value={Number(today?.visitors ?? 0).toLocaleString()}
        />
        <StatCard
          label={`Visitors (${key})`}
          value={totalVisitors.toLocaleString()}
        />
        <StatCard
          label={`Sessions (${key})`}
          value={totalSessions.toLocaleString()}
        />
        <StatCard
          label={`Page views (${key})`}
          value={totalViews.toLocaleString()}
        />
      </div>

      <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
          Daily visitors
        </h2>
        <TrendLine
          points={daily.map((d) => ({
            label: String(d.day).slice(0, 10),
            value: Number(d.visitors),
          }))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HBarList
          title="Top pages"
          rows={pages.map((p) => ({
            label: p.url_path,
            value: Number(p.views),
          }))}
        />
        <HBarList
          title="Top sources"
          rows={sources.map((s) => ({
            label: s.source,
            value: Number(s.sessions),
            detail:
              Number(s.conversions) > 0 ? `${s.conversions} leads` : undefined,
          }))}
        />
        <HBarList
          title="Countries"
          rows={geo.map((c) => ({
            label: c.country,
            value: Number(c.sessions),
          }))}
        />
        <HBarList
          title="Devices"
          rows={devs.map((d) => ({
            label: d.device,
            value: Number(d.sessions),
          }))}
        />
      </div>

      <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-cream-faint">
          Recent sessions
        </h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-cream-faint">No sessions recorded yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-cream-faint">
                <th className="pb-2 font-medium">Entry page</th>
                <th className="pb-2 font-medium">Pages</th>
                <th className="pb-2 font-medium">Country</th>
                <th className="pb-2 font-medium">Device</th>
                <th className="pb-2 font-medium">Browser</th>
                <th className="pb-2 text-right font-medium">Last seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sessions.map((s) => (
                <tr key={s.session_id}>
                  <td className="py-2.5 text-cream">{s.entry_path ?? "—"}</td>
                  <td className="py-2.5 text-cream-dim">{s.pages}</td>
                  <td className="py-2.5 text-cream-dim">{s.country ?? "—"}</td>
                  <td className="py-2.5 text-cream-dim">{s.device ?? "—"}</td>
                  <td className="py-2.5 text-cream-dim">{s.browser ?? "—"}</td>
                  <td className="py-2.5 text-right text-cream-faint">
                    {ago(s.last_seen)}
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
