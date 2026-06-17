import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (.next/standalone).
  output: "standalone",
  // Allow the LAN/host IP to load dev resources (HMR, fonts, client chunks)
  // when previewing the dev server from another origin than localhost.
  allowedDevOrigins: ["10.2.0.2"],
};

export default nextConfig;
