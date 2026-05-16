# Perfectly Planned — Website

A multi-page marketing website for **Perfectly Planned**, a family-owned boutique
wedding planning & coordination studio in Bryan–College Station, Texas.

Designed & built by **Turnkey Web**. Static HTML/CSS/JS — no build step.

## Live site

GitHub Pages, served from `main` branch root: <https://turnkeycfo.github.io/perfectly-planned-tx/>

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | The studio, story, owners & coordinating team |
| `services.html` | Packages, pricing, the five-step process, FAQ |
| `gallery.html` | Categorized galleries with a lightbox viewer |
| `praise.html` | Testimonial, awards & recognition, ratings |
| `contact.html` | Inquiry form, contact details, service areas |
| `404.html` | Friendly not-found page |

## Shared assets

| File | Purpose |
|---|---|
| `styles.css` | Full design system & every page's layout |
| `main.js` | Nav, mobile menu, preloader, lightbox, FAQ accordion, count-up, inquiry form |
| `motion.js` | Motion-library scroll & entrance animation (progressive enhancement) |
| `images/` | 39 wedding photographs (free, commercial-use stock — Unsplash) |
| `.nojekyll` | Serve files as-is on GitHub Pages |

## Design

- **Palette & type matched to the studio's brand** — warm champagne, cream, and a
  caramel-gold accent; Forum + Cormorant Garamond + Jost.
- Photography-forward, editorial multi-page layout with layered depth.
- Bespoke craft: a one-time entrance preloader, a full-screen gallery lightbox,
  an animated FAQ accordion, an awards wall, and signature scroll choreography.
- Animation via the **Motion** library (the engine behind Framer Motion), loaded
  from a CDN as a progressive enhancement — if it ever fails to load, all content
  still shows and the site remains fully functional.
- Fully responsive, accessible, reduced-motion aware. Per-page SEO + Open Graph.
- The inquiry form opens the visitor's email client addressed to the studio.

## Photography

All images in `images/` are free, commercial-use stock (Unsplash — no attribution
required), curated as a cohesive warm-editorial set. They stand in for the studio's
own portfolio: replace any file in `images/` with a real photograph of the same
name to swap it in. Team portraits use elegant monogram medallions, not stock faces.

## Custom domain

Repo **Settings → Pages → Custom domain** → enter `perfectlyplannedtx.com`, then
point DNS at GitHub Pages. A `CNAME` file is added automatically.

## Notes on content

Copy, services, pricing, team, and the client testimonial are sourced from the
studio's existing website. Founding-year language is kept soft ("for more than a
decade") — confirm the exact year before adding a hard date. Award years on the
Praise page reflect 2018–2024 recognition; adjust if the studio's records differ.
