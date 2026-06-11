import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "gf_admin";
const SESSION_DAYS = 7;

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "guestoverflow-dev-secret";
}

export function adminUser(): string {
  return process.env.ADMIN_USER ?? "admin";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin";
}

/** True while the panel is protected only by the default admin/admin. */
export function usingDefaultCreds(): boolean {
  return adminUser() === "admin" && adminPassword() === "admin";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Cookie value: `<expiryEpochMs>.<hmac>` */
export function createSession(): { value: string; maxAge: number } {
  const exp = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return {
    value: `${exp}.${sign(exp)}`,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot < 1) return false;
  const exp = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(exp) > Date.now();
}

export function checkCredentials(user: string, password: string): boolean {
  // Hash both sides so comparison is constant-time regardless of length.
  const h = (s: string) => createHmac("sha256", secret()).update(s).digest();
  const userOk = timingSafeEqual(h(user), h(adminUser()));
  const passOk = timingSafeEqual(h(password), h(adminPassword()));
  return userOk && passOk;
}

/** Guard for server actions and admin route handlers (defense in depth). */
export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  if (!verifySessionValue(store.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }
}
