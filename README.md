# Perfectly Planned — Website Rebuild

A rebuilt marketing site for **Perfectly Planned**, a family-owned boutique wedding
planning & coordination studio in Bryan–College Station, Texas.

Designed & built by **Turnkey Web**. Static HTML/CSS/JS — no build step.

## Live site

GitHub Pages, served from `main` branch root: <https://turnkeycfo.github.io/perfectly-planned-tx/>

## Files

| File | Purpose |
|---|---|
| `index.html` | Page content & structure |
| `styles.css` | Full design system & responsive layout |
| `main.js` | Nav, mobile menu, count-up stats, inquiry form |
| `motion.js` | Motion-library scroll & entrance animations (progressive enhancement) |
| `images/` | Wedding photography (free, commercial-use stock from Unsplash) |
| `.nojekyll` | Serve files as-is on GitHub Pages |

## Design

- **Palette & type matched to the studio's brand** — warm champagne, cream, and a
  caramel-gold accent; Forum + Cormorant Garamond + Jost.
- Photography-forward, editorial layout with layered depth.
- Animation via the **Motion** library (the engine behind Framer Motion), loaded
  from a CDN as a progressive enhancement — if it fails to load, all content still
  shows and the site remains fully functional.
- Fully responsive, accessible, reduced-motion aware.
- Inquiry form opens the visitor's email client addressed to the studio.

## Photography

All images in `images/` are free, commercial-use stock (Unsplash — no attribution
required). They are placeholders for the studio's own portfolio: replace any file
in `images/` with a real photograph of the same name and orientation to swap it in.
Team portraits use elegant monogram medallions rather than stock faces.

## Custom domain

Repo **Settings → Pages → Custom domain** → enter `perfectlyplannedtx.com`, then
point DNS at GitHub Pages. A `CNAME` file is added automatically.

## Content source

Copy, services, pricing, team, and the client testimonial are sourced from the
studio's existing website. Founding-year language is kept soft ("for more than a
decade") — confirm the exact year before adding a hard date.
