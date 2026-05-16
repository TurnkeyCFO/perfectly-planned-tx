# Perfectly Planned — Website Rebuild

A rebuilt marketing site for **Perfectly Planned**, a boutique wedding planning &
coordination studio in Bryan–College Station, Texas.

Built by **Turnkey Web**. Static HTML/CSS/JS — no build step, no dependencies.

## Live site

Hosted on GitHub Pages: served from the `main` branch root.

## Files

| File | Purpose |
|---|---|
| `index.html` | All page content & structure |
| `styles.css` | Full design system & responsive layout |
| `main.js` | Nav, scroll reveals, count-up stats, inquiry form |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Design

- Light editorial theme — warm ivory, sage, and clay palette
- Display type: Fraunces · Body type: Plus Jakarta Sans
- Fully responsive, accessible, reduced-motion aware
- Inquiry form opens the visitor's email client addressed to `info@perfectlyplannedtx.com`

## Swapping in real photography

The site ships with art-directed gradient panels so it looks finished today.
To drop in the studio's own photos, search the code for **`SWAP:`** comments:

1. **Hero** — replace the `.hero__photo` background in `styles.css` with the studio's hero image.
2. **Gallery** — each `.tile__img` in the gallery is sized to receive a real photo;
   replace the gradient backgrounds (`.tile__img--a` … `--e`) with `url('images/…')`.
3. **Team portraits** — `.owner__portrait` panels can take real headshots the same way.

## Connecting the custom domain

In repo **Settings → Pages → Custom domain**, enter `perfectlyplannedtx.com`, then
point DNS at GitHub Pages. A `CNAME` file will be added automatically.

## Content source

Copy, services, pricing, team, and testimonial sourced from the studio's existing
website. Founding-year language kept intentionally soft ("for more than a decade") —
confirm the exact year before adding a hard date.
