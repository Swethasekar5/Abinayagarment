import { defineConfig } from 'astro/config';

// Static site: `npm run build` outputs plain HTML/CSS/JS to ./dist
//
// Locally the site runs at "/". The GitHub Pages workflow sets:
//   SITE_URL  = https://<owner>.github.io
//   BASE_PATH = /<repo>   (empty when a custom domain is used)
// Internal links go through src/lib/url.ts so they pick up the base path.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  vite: {
    // Pre-bundle the motion libraries at dev-server start. Otherwise Vite discovers them
    // page by page, re-optimises mid-session, and open pages get "504 Outdated Optimize Dep"
    // (GSAP fails to load and the hero falls back to its static layout).
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'gsap/Flip', 'lenis'],
    },
  },
});
