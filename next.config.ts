import type { NextConfig } from "next";
import path from "node:path";

const BACKEND_URL = (process.env.BACKEND_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Pin the workspace root so Turbopack ignores the parent test lockfile. */
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    /* Single-process page-data collection: avoids worker spawn issues on
       restricted Windows sandboxes / CI images without extra privileges. */
    workerThreads: false,
    cpus: 1,
  },
  images: {
    /* Product/hero imagery comes from Cloudinary (admin uploads) and the
       Unsplash placeholders the backend seeds with. */
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      /* The admin panel (public/admin.html) calls /api/* on its own origin;
         proxy every API call through to the FastAPI backend. */
      { source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` },
      /* Pretty URL for the admin panel. */
      { source: "/admin", destination: "/admin.html" },
    ];
  },
};

export default nextConfig;
