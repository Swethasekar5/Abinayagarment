# Abinaya Garment Shop

Wholesale cotton apparel website, built with [Astro](https://astro.build) (static site) + Bootstrap 5.

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Dev server at http://localhost:4321           |
| `npm run build`   | Build the static site into `./dist`           |
| `npm run preview` | Preview the production build locally          |

## Structure

- `src/pages/` – one file per route (`/`, `/about-us`, `/products`, `/gallery`, `/contact-us`, `/privacy`, 404)
- `src/layouts/Layout.astro` – shared header, nav, footer
- `src/data/products.json`, `src/data/gallery.json` – product and gallery content (edit these to change the catalogue)
- `src/styles/site.css`, `src/scripts/site.js` – design system and client-side behaviour
- `public/` – static files copied as-is

The contact form opens a pre-filled WhatsApp message (number set at the bottom of `src/pages/contact-us.astro`).
