import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SidebarNav } from "@/components/admin/SidebarNav";
import { usingDefaultCreds } from "@/lib/admin/auth";
import { logoutAction } from "@/app/admin/login/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="fixed inset-y-0 left-0 flex w-56 flex-col border-r border-line bg-surface/40 p-5">
        <Link href="/admin" aria-label="Admin overview">
          <Logo />
        </Link>
        <div className="mt-8 flex-1">
          <SidebarNav />
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-md px-3 py-2 text-left text-sm text-cream-faint transition-colors hover:bg-surface hover:text-cream"
          >
            Sign out
          </button>
        </form>
      </aside>

      <div className="ml-56 flex-1">
        {usingDefaultCreds() && (
          <div className="border-b border-amber-deep/60 bg-amber/10 px-8 py-2.5 text-xs text-amber">
            Default admin credentials are in use. Set ADMIN_USER,
            ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the environment before
            this site goes public.
          </div>
        )}
        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
