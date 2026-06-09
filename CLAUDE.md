# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Action School Website is a single-page marketing site for Kerala's first sport flying school. It uses **vanilla HTML, CSS, and JavaScript with no build system, no package manager, and no framework dependencies**.

## Running the Site

Open `index.html` directly in a browser, or serve with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no build, lint, or test commands — the site ships as-is from the repository.

## Architecture

All code lives in three files:

| File | Lines | Purpose |
|------|-------|---------|
| `index.html` | ~671 | Full page markup, 9 sections, inline Kerala SVG map |
| `style.css` | ~1392 | CSS custom properties, layout, animations, responsive rules |
| `script.js` | ~354 | All interactivity, wrapped in an IIFE |

### `script.js` Structure

The script is a single IIFE containing discrete, sequential initialization blocks (not classes or modules):

1. Header scroll state (backdrop blur on scroll)
2. Hero video + sound toggle
3. Mobile nav hamburger
4. Language toggle (EN ↔ Malayalam)
5. Scroll reveal via `IntersectionObserver`
6. Smooth scroll for anchor links
7. Active nav link tracking on scroll
8. Gallery video lazy-loading via `IntersectionObserver`
9. Contact form submission + success message
10. Image error cleanup
11. Youth initiative orbit hover pause
12. About section card shuffle animation (4s loop)

### `style.css` Structure

Sections are delimited by comments (`/* ===== HEADER ===== */` etc.) and follow the document order. Responsive breakpoints: `1024px`, `960px` (nav collapse), `900px`, `768px`, `600px`, `480px`.

CSS custom properties are defined in `:root` and cover the full color scale, shadows, transitions, and border radii.

## Bilingual Support (EN/Malayalam)

Every user-facing text element carries both `data-en` and `data-ml` attributes:

```html
<h2 data-en="About Us" data-ml="ഞങ്ങളെ കുറിച്ച്">About Us</h2>
```

`script.js` toggles language by iterating `[data-en]` elements and setting either `innerHTML` (for elements with nested markup) or `textContent` (plain text). The active language is tracked in a `currentLang` variable — it is not persisted across page loads.

When editing copy, always update both `data-en` and `data-ml` attributes, and keep the element's default text content in English.

## Key Patterns

**Scroll reveal:** Add class `reveal` to any element. The `IntersectionObserver` in `script.js` fires once per element and staggers sibling reveals 110ms apart. No additional JS is needed.

**Hero parallax:** The hero video uses `translateY(scrollY * 0.25)` on the scroll event. This is the only scroll-driven transform.

**Kerala SVG map:** The inline SVG in the Aero-Parks section (around line 488–527 of `index.html`) contains hardcoded `<circle>` elements for cities. The active aeropark (Thiruvananthapuram) has a pulsing `cityPulse` animation; future expansion sites use dashed styling.

**Videos:** `hero-flight.mp4` autoplays muted in the hero. Gallery videos (`shorts-flight.mp4`) use `preload="metadata"` and load their `src` lazily once in viewport.

**Color accent:** Orange `#f4802a` is the single brand accent. Blues are CSS variables (`--blue-900` through `--blue-100`). Don't introduce hex values for these directly — use the CSS variables.

## Git Branch

Active development branch: `claude/claude-md-docs-o9z6db`
