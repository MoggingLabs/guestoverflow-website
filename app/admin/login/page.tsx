import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { usingDefaultCreds } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-lg border border-line bg-surface p-8 shadow-card">
          <h1 className="font-display text-xl font-medium text-cream">
            Admin panel
          </h1>
          <LoginForm next={next ?? "/admin"} />
          {usingDefaultCreds() && (
            <p className="mt-5 rounded-md border border-amber-deep/60 bg-amber/10 px-3 py-2.5 text-xs leading-relaxed text-amber">
              Default credentials are active (admin / admin). Set ADMIN_USER,
              ADMIN_PASSWORD, and ADMIN_SESSION_SECRET before deploying.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
