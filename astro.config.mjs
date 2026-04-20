// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: 'https://zw1sh.github.io',     // 你的 GitHub Pages 地址
  base: '/',                           // ← 必须是 '/'，因为是 username.github.io 仓库

  integrations: [react(), markdoc()],

  vite: {
    plugins: [tailwindcss()],
  },

  // GitHub Pages uses static hosting; keep this project SSG-friendly.
  // For Project Pages, set BASE_PATH to "/<repo>/" in CI.
  base: process.env.BASE_PATH ?? "/",
  // Optional but recommended for correct absolute URLs (RSS/SEO).
  // You can set SITE in CI or locally if you want.
  site: process.env.SITE,
});
