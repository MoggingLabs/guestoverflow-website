// Liveness probe for the container healthcheck and Traefik.
// Intentionally cheap: it answers "is the Next.js server up and serving?",
// not "is the database reachable?" (that's a separate readiness concern).
// force-dynamic so it is never statically cached.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ status: "ok", uptime: process.uptime() });
}
