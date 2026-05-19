# TrenchCore

Static marketing website for TrenchCore LLC, a Colorado trenching, excavation, irrigation, drainage, and hardscaping company.

## Purpose

This repository contains a multi-page brochure site intended for public hosting. It is a plain HTML/CSS/JavaScript site with no build step and no server-side code in this repo.

## Stack

- HTML for page structure
- CSS in a single global stylesheet
- Vanilla JavaScript for navigation, reveal animations, and quote form behavior
- Static image assets stored in the repo
- External assets loaded at runtime:
  - Google Fonts
  - Pexels-hosted hero images
  - Formspree placeholder endpoint in `script.js`

## Repo Structure

- `index.html`: homepage with hero, services preview, about, testimonials, CTA, and footer
- `services.html`: detailed service offerings and process overview
- `contact.html`: quote request form, company contact info, team section, and FAQ content
- `privacy-policy.html`: privacy policy and contact details
- `styles.css`: full site styling, design tokens, layout, animation, and responsive rules
- `script.js`: mobile nav behavior, active nav state, scroll reveal, anchor scrolling, and quote form submission
- `images/`: additional image assets if used later
- `FullLogo*.PNG`, `logoText.PNG`: brand assets used in navigation/footer
- `CNAME`: custom domain config for static hosting
- `.nojekyll`: disables Jekyll processing for GitHub Pages style hosting
- `.vercel/`: Vercel project metadata

## How The Site Works

### Navigation

- The nav is fixed at the top and gains a `scrolled` class after the user scrolls past 60px.
- Mobile navigation uses `.nav-toggle` and toggles the `.open` class on `.nav-links`.
- The script also handles focus management and Escape-to-close behavior.

### Forms

- The quote form lives in `contact.html` as `#quoteForm`.
- `script.js` performs client-side required-field validation.
- Submission posts to `FORM_ENDPOINT` using `fetch()` and `FormData`.
- The current endpoint is a placeholder: `https://formspree.io/f/YOUR_FORM_ID`.
- Until that value is replaced with a real endpoint, quote submissions will fail.

### Animation / Interaction

- Reveal animations are driven by `IntersectionObserver`.
- Smooth scrolling is attached to local `#anchor` links.
- Styling uses CSS custom properties under `:root` for colors, typography, and timing.

## Deployment Notes

- This project can be hosted as-is on GitHub Pages, Vercel, Netlify, or any static file host.
- There is no install, build, or compile step.
- Opening `index.html` directly in a browser is sufficient for local review, but the form still requires a real backend endpoint to function.

## AI Maintenance Notes

- The site is intentionally simple and centralized: most edits happen in the four HTML files, `styles.css`, and `script.js`.
- Footer contact details are duplicated across pages, so global contact changes must be applied in multiple files.
- Brand copy currently presents TrenchCore as established in 2008 and serving Colorado statewide.
- Several text strings show mojibake such as `â€”` and `Â·`, which indicates an encoding issue in the HTML/JS source files. Future cleanup should normalize these files to UTF-8 and replace those broken characters with proper punctuation or plain ASCII.
- Social links in the footer currently use `#` placeholders.
- Hero photography on the homepage is loaded from remote Pexels URLs rather than committed local assets.

## Recommended Next Fixes

1. Replace the Formspree placeholder with a live form endpoint.
2. Clean up text encoding artifacts across HTML and JavaScript files.
3. Replace placeholder social links with real destinations.
4. Decide whether remote Pexels images should be self-hosted for reliability.

## Current Contact Email

Public site email is set to `Kevin@trenchcorellc.com`.
