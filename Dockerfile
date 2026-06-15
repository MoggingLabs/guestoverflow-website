# syntax=docker/dockerfile:1
# Multi-stage build for the GuestOverflow website (Next.js 16, App Router).
# Relies on `output: "standalone"` in next.config.ts, which emits a minimal
# server.js plus only the node_modules it actually needs. We then layer the
# `public/` and `.next/static/` folders in by hand (standalone does not copy
# them — see Next.js docs: api-reference/config/next-config-js/output).

# ---- deps: install full dependencies (incl. dev) for the build ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the standalone server ----
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* values are inlined at build time, so the public site URL is
# baked per-image here (prod image vs staging image differ by branch anyway).
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner: lean production image ----
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# The standalone server reads these to bind correctly inside the container.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Run as a non-root user inside the container.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Static assets the standalone server serves but does not bundle itself.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# server.js is the standalone entrypoint. Compose runs it with `init: true`
# so SIGTERM reaches Node for Next's graceful shutdown.
CMD ["node", "server.js"]
