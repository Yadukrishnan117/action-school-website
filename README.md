# Action School Website

Official website for **Action School** — bringing sport flying and low-speed aviation to the youth of Kerala.

**Live Site:** https://actionschool.in  
**GitHub Pages (backup):** https://yadukrishnan117.github.io/action-school-website/  
**Repository:** https://github.com/Yadukrishnan117/action-school-website

---

## About Action School

Based in Thiruvananthapuram, Action School is more than a flying club — it is a mission to transform the energy of Kerala's youth through aviation. We offer Ultra-Light Aircraft, Paramotors, and Gyrocopter flying experiences.

**Contact:** Mr. Arjun | info@actionschool.in | Thiruvananthapuram, Kerala

---

## Project Structure

```
action-school-website/
├── index.html       # Main HTML - all page sections
├── style.css        # All styling, responsive breakpoints, animations
├── script.js        # Navigation, scroll effects, mobile menu
├── CNAME            # Custom domain: actionschool.in
├── CHANGELOG.md     # Version history and release notes
└── README.md        # This file
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Full-screen with headline and CTA buttons |
| About | Mission statement and background |
| Activities | Ultra-Light Aircraft, Paramotor, Gyrocopter cards |
| Ecosystem | Partners (chargeMOD), team, validators |
| Aero-Parks | Future take-off and landing zones across Kerala |
| Contact / Footer | Social links, contact info |

---

## Technology Stack

- **HTML5** — Semantic markup
- **CSS3** — Flexbox, Grid, animations, responsive design
- **Vanilla JavaScript** — No frameworks or dependencies
- **GitHub Pages** — Free static hosting with CI/CD on push
- **GoDaddy** — DNS management for actionschool.in

---

## DNS Configuration (GoDaddy)

These records must be set in GoDaddy DNS Management for actionschool.in:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 600 sec |
| A | @ | 185.99.109.153 | 600 sec |
| A | @ | 185.199.110.153 | 600 sec |
| A | @ | 185.199.111.153 | 600 sec |
| CNAME | www | yadukrishnan117.github.io | 1 Hour |

DNS propagation takes 2-48 hours after changes.

---

## GitHub Pages Configuration

- **Source:** main branch, root directory
- **Custom domain:** actionschool.in (set in Settings > Pages)
- **HTTPS:** Enabled after DNS propagation
- **CNAME file:** Required in repo root (already present)

---

## Local Development

No build step required. Open directly in browser:

```bash
# Clone the repo
git clone https://github.com/Yadukrishnan117/action-school-website.git
cd action-school-website

# Open in browser (macOS)
open index.html

# Or use a local server
npx serve .
```

---

## Deployment

All changes pushed to the `main` branch are automatically deployed to GitHub Pages within 1-2 minutes.

```bash
git add .
git commit -m "feat: describe your change"
git push origin main
```

Check deployment status at: https://github.com/Yadukrishnan117/action-school-website/actions

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

---

## License

Copyright 2026 Action School, Thiruvananthapuram, Kerala. All rights reserved.
