import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (.next/standalone).
  output: "standalone",
};

export default nextConfig;
