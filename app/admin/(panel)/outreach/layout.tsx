import { OutreachTabs } from "@/components/admin/OutreachTabs";

/** Shared chrome for the Outbound section: title + tabbed sub-navigation. */
export default function OutreachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium text-cream">Outbound</h1>
        <p className="mt-1 max-w-2xl text-sm text-cream-faint">
          Cold &amp; warm email outreach to leads and prospects — sequences that
          send automatically, with a one-click unsubscribe on every email.
        </p>
      </div>
      <OutreachTabs />
      <div>{children}</div>
    </div>
  );
}
