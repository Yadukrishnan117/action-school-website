# Action School — Sport Flying Kerala

**Kerala's First Sport Flying School Website**
Live at: https://yadukrishnan117.github.io/action-school-website/

---

## Project Overview

Action School is a Thiruvananthapuram-based sport flying initiative bringing paramotors, gyrocopters, and ultra-light aircraft to the youth of Kerala. This website serves as the primary digital presence for the school, built to attract students, partners, and tourism interest.

**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript · GitHub Pages

---

## Website Sections

| Section | Description |
|---|---|
| Hero | Full-screen background video with CTA buttons and sound toggle |
| About | Mission statement with animated card stack (shuffle animation) |
| Activities | Ultralight Aircraft · Paramotors · Gyrocopters |
| Ecosystem | Partners — chargeMOD technology partner, expert pilot team |
| Youth Initiative | Sky-circle animation with youth focus messaging |
| Aero-Parks | Kerala expansion map with TVM / Kochi / Kozhikode markers |
| Gallery | 2 video showcase cards (Featured Flight + Short Clip) |
| Contact | Enquiry form with WhatsApp + email |
| Footer | Quick links, contact info, social media |

---

## Features

- **Bilingual toggle** — English / Malayalam (EN/ML) via data-en / data-ml attributes
- **Video hero background** — autoplay muted loop with sound toggle button
- **Card shuffle animation** — About section cards auto-rotate every 4 seconds
- **Kerala SVG map** — Inline SVG with accurate city markers and TVM pulse animation
- **IntersectionObserver reveal** — Scroll-triggered fade-in animations on .reveal elements
- **Fully responsive** — Mobile-first CSS with breakpoints at 1024px / 960px / 900px / 768px / 600px / 480px
- **Zero external images** — No broken 404 requests; all visuals from video or CSS

---

## Deployment

Hosted on **GitHub Pages** from the main branch.

Repository: https://github.com/yadukrishnan117/action-school-website

---

## Git Commit History

| Commit | Date | Description |
|---|---|---|
| f0feebdf | 2026-06-09 | fix: gallery videos overlapping on mobile — reset grid-column/row to auto in mobile breakpoint |
| 23fc1e39 | 2026-06-09 | fix: remove strip CSS, add comprehensive mobile responsive fixes |
| dbe4d553 | 2026-06-09 | fix: remove hero-image-strip section and all broken image refs |
| 177f25da | 2026-06-09 | fix: add strip-img-gradient style, remove obsolete hero-fallback CSS |
| f3cff6a3 | 2026-06-09 | fix: remove broken kerala-aviation.jpg references (404 errors) |
| e08ae4a4 | 2026-06-09 | Clean up gallery photo CSS styles |
| 59c38b05 | 2026-06-09 | Remove photo card from gallery, keep 2 videos only |
| 16978071 | 2026-06-09 | Replace map CSS with Kerala SVG map styles |
| d2fc798d | 2026-06-09 | Replace map placeholder with accurate Kerala SVG map |
| e2bc66e0 | 2026-06-09 | Fix: card shuffle animation with correct encoding, 4s continuous loop |
| b50f2f27 | 2026-06-09 | Fix: card shuffle animation with correct encoding, 4s continuous loop |
| 5e12bfd1 | 2026-06-09 | Add card shuffle animation + increase timing to 4s continuous loop |
| cf295ef7 | 2026-06-09 | Add card shuffle animation + increase timing to 4s continuous loop |
| 1a340ae3 | 2026-06-09 | Clean up: add .gitignore, remove junk files from tracking |
| 3513be8d | 2026-06-09 | Initial commit: Action School website |

---

## Known Issues Fixed

| Bug | Root Cause | Fix Commit |
|---|---|---|
| Gallery videos overlapping on mobile | grid-column: 1 on both items in single-column grid forced overlap | f0feebdf |
| 404 errors for kerala-aviation.jpg | Image file never existed in repo; referenced in 5 places | f3cff6a3 |
| JS console error (UAT) | CDN propagation lag during test — not a code bug | Resolved by CDN |
| Card shuffle animation broken | UTF-8 encoding corruption in push | e2bc66e0 |

---

## Contact

**Mr. Arjun** — Thiruvananthapuram, Kerala
info@actionschool.in

Backed by **chargeMOD** | chargemod.com