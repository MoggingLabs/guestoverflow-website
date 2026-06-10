"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  ADMIN_COOKIE,
  checkCredentials,
  createSession,
} from "@/lib/admin/auth";

// Simple per-IP attempt limiter (resets on deploy — fine for a panel).
const attempts = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export type LoginState = { error: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return { error: "Too many attempts. Try again in a minute." };
  }

  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(user, password)) {
    return { error: "Wrong username or password." };
  }

  const session = createSession();
  const store = await cookies();
  store.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });

  const next = String(formData.get("next") ?? "/admin");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
