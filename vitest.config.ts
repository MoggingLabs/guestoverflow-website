import path from "node:path";
import { defineConfig } from "vitest/config";

// Outreach unit tests run anywhere; integration tests need the dev stack
// (`docker compose up -d`) — postgres on TEST_DATABASE_URL + mailpit.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // `server-only` throws outside a real server bundle; stub it for tests.
      "server-only": path.resolve(__dirname, "tests/helpers/empty.ts"),
      "client-only": path.resolve(__dirname, "tests/helpers/empty.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 20_000,
    hookTimeout: 20_000,
    // Integration tests share DB tables — run files serially to avoid races.
    fileParallelism: false,
    pool: "forks",
  },
});
