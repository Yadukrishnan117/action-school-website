# Changelog — Action School Website

All notable changes to `actionschool.in` are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.3] — 2026-07-20 · Hotfix: Hidden Elements Visible Under CSP

### 🔧 Fixed
- **Honeypot field and success message were visible** — the site's CSP (`style-src` without `unsafe-inline`) blocks inline `style="display:none"` attributes, so the spam honeypot, the form success message, and the sound-on icon rendered on load. All three now use a stylesheet class `.is-hidden`, and script.js toggles the class instead of inline styles.
- Cache-bust bumped to `?v=1.3.3` for style.css and script.js

---

## [1.3.2] — 2026-07-20 · Working Enquiry Form, SEO & Test-Report Fixes

### ✅ Added
- **Enquiry form now actually sends** — wired to FormSubmit.co AJAX endpoint delivering to `info@actionschool.in`. ⚠️ One-time step: the first submission triggers an activation email to info@actionschool.in — click the confirmation link in it, after which all enquiries are delivered.
- **Spam honeypot** — hidden `_honey` field silently drops bot submissions
- **Client-side validation** — name and email/phone required before send; clear error message shown if sending fails (with email/WhatsApp fallback hint)
- **SEO meta description** — resolves QA report "RECOMMENDED" item
- **Open Graph + Twitter card tags & canonical URL** — better link previews when shared on WhatsApp/Instagram/Facebook

### 🔧 Fixed
- **Gallery selector mismatch (UAT FAIL)** — removed dead code in `script.js` referencing elements deleted in earlier releases (`#hero-fallback-img`, `.strip-img`, `.hero-image-strip`, `.gallery-img`, `.gallery-photo`)
- **CSP updated** — `connect-src` now allows `https://formsubmit.co` (required for form delivery); all other policies unchanged
- Cache-bust query bumped to `?v=1.3.2` for script.js

---

## [1.3.0] — 2026-06-15 · Remove Malayalam Language Toggle

### 🗑️ Removed
- **Bilingual language toggle (EN/ML)** — The EN/ML switch button has been removed from the navigation bar. The site now operates in English only.
- **Noto Sans Malayalam font** — Removed from Google Fonts import (reduces page load weight)
- **`data-ml` attributes** — All Malayalam text attributes stripped from every element across index.html
- **`data-en` attributes** — Removed (no longer needed without toggle)
- **`applyLanguage()` function** — Language switching logic removed from script.js
- **`currentLang` state variable** — No longer needed; removed from script.js
- **`lang-toggle` / `lang-label` DOM refs** — Removed from script.js

### ✅ Unchanged
- All English content remains exactly as before — no text was lost
- All other features (nav, video hero, card shuffle, scroll reveal, enquiry form) work as normal
- Security headers and all v1.2.0 security hardening remains in place

---

## [1.2.0] — 2026-06-15 · Security Hardening & Production Launch

### 🚀 Production Status
- **actionschool.in is LIVE** — fully resolving on GitHub Pages via custom domain
- DNS propagation confirmed: all four GitHub Pages A-records active worldwide
- HTTPS enforced — SSL certificate provisioned by GitHub Pages automatically

### 🔒 Security Added
- **Content Security Policy (CSP)** meta tag added to `index.html` — restricts script, style, media, and connection sources to known trusted origins only
- **X-Frame-Options: DENY** — blocks the site from being embedded in iframes (prevents clickjacking attacks)
- **X-Content-Type-Options: nosniff** — stops browsers from guessing MIME types on responses
- **Strict-Transport-Security** — enforces HTTPS for 1 year including all subdomains
- **Permissions-Policy** — disables access to geolocation, microphone, camera, payment and USB APIs
- **Referrer-Policy: strict-origin-when-cross-origin** — prevents full URL leakage when navigating to external sites
- **robots.txt** created — discloses nothing sensitive to crawlers, blocks `.git/`, backups, admin paths
- **.gitignore** hardened — environment files, private keys, SQL dumps, backup archives now excluded from version control
- **security.txt** added at `/.well-known/security.txt` for responsible vulnerability disclosure

### ✅ VAPT Results (Self-Assessment — June 2026)
- Mixed content: **PASS** — no HTTP resources on an HTTPS page
- Sensitive file exposure (`.env`, `.git/config`, `backup.zip`): **PASS** — all return 404
- Inline scripts: **PASS** — zero inline JS
- iFrame usage: **PASS** — no iframes present
- HTTPS enforcement: **PASS** — site redirects HTTP → HTTPS
- External link safety: **PASS** — no unprotected external links
- Form injection surface: **LOW RISK** — enquiry form is client-side only, no server processing

---

## [1.1.0] — 2026-06-14 · Custom Domain & DNS Setup

### Added
- CNAME file created in repository root with value `actionschool.in`
- GoDaddy DNS configured with four GitHub Pages A-records:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- CNAME record: `www` → `yadukrishnan117.github.io`
- DNS TTL set to 600 seconds for fast propagation
- README.md and project documentation added to repository
- CHANGELOG.md introduced (this file)

### Fixed
- Resolved GoDaddy DPS (Domain Publishing Solution) conflict — GoDaddy Airo "Coming Soon" page was intercepting actionschool.in traffic despite correct DNS records. DNS propagated correctly after GoDaddy's internal routing resolved.

---

## [1.0.0] — 2026-06-13 · Initial Launch on GitHub Pages

### Added
- Full Action School aviation website built and deployed at `yadukrishnan117.github.io/action-school-website/`
- **Hero section** — full-screen video background, animated headline, dual CTA buttons
- **About section** — mission statement with animated card shuffle
- **Activities section** — Ultra-Light Aircraft, Paramotor, Gyrocopter cards
- **Ecosystem section** — chargeMOD partnership, pilot team credentials
- **Youth Initiative section** — sky-circle animation, anti-drug alternative messaging
- **Aero-Parks section** — Kerala SVG map with Thiruvananthapuram / Kochi / Kozhikode expansion markers
- **Gallery section** — Featured Flight video and Short Clip showcase
- **Contact / Enquiry section** — form with client-side handling, WhatsApp + email links
- **Footer** — quick links, social icons, legal note
- **Bilingual support** — English / Malayalam toggle via `data-en` / `data-ml` attributes
- **Video hero background** — autoplay muted loop, sound toggle button
- **Scroll reveal animations** — sections animate in as user scrolls
- **Fully responsive** — mobile-first layout, hamburger nav on small screens
- **Performance** — no external JS dependencies, vanilla HTML/CSS/JS only

### Tech Stack
- HTML5 · CSS3 · Vanilla JavaScript
- Hosted on GitHub Pages (free, zero-cost)
- Videos served from `/videos/` directory in repository

---

*Maintained by the Action School development team. Contact: info@actionschool.in*
