// Bundles the outreach worker into a single self-contained ESM file
// (dist/outreach-worker.mjs) so the production image can run it with plain
// `node` — no dev toolchain, no node_modules, in the lean standalone runner.
import { build } from "esbuild";

await build({
  entryPoints: ["scripts/outreach-worker.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  outfile: "dist/outreach-worker.mjs",
  // Some bundled CJS deps (postgres, nodemailer) use require() internally;
  // expose it under ESM.
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
  logLevel: "info",
});
