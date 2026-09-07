# Movira-landing

Bilingual marketing site for MOVIRA, a Colombian last-mile network that lets logistics companies absorb order peaks through verified independent drivers instead of buying fleet.

## Description

MOVIRA sells capacity a company does not have to own. Rather than adding vehicles, warehouses and drivers to reach new territory, a logistics business routes its surplus orders and hard-to-cover zones to a network of independent drivers who are already on the road. The site leads with that outcome — *widen your coverage without buying a fleet* — and only then explains the mechanism.

The page runs the argument in a fixed order: how the integration works step by step, what the platform includes, why an external network beats owned assets, the nine questions prospects actually ask, and a single contact route.

Both language versions ship from one stylesheet set and one script set, so a layout change reaches Spanish and English at once and only the copy is duplicated.

Every claim on the page traces back to client-supplied material kept in `docs/fuentes/`. There are no invented metrics, testimonials or customer names anywhere in the markup.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | 5 static pages across two languages |
| Styling | CSS3 with custom properties | Mobile-first, `min-width` breakpoints at 480 / 768 / 1024 / 1440 |
| Theming | `data-theme` attribute + `localStorage` | Light and dark, applied before first paint to avoid a flash |
| Scripting | JavaScript (vanilla, classic scripts) | One entry point plus four modules on a `window.Movira` namespace |
| Icons | Inline SVG | Hand-written in the markup; no icon library, no CDN |
| Typography | Inter, from Google Fonts | The only external request the site makes |
| Build step | None | Files are served exactly as they are committed |

Classic scripts are used deliberately instead of ES modules: they let `index.html` work when opened straight from disk with `file://`, where ES modules are blocked by CORS.

## Project structure

```
.
├── index.html                    # Spanish landing page
├── politica-de-privacidad.html   # Spanish privacy policy
├── 404.html                      # Not-found page; uses root-relative asset paths
├── en/
│   ├── index.html                # English landing page
│   └── privacy-policy.html       # English privacy policy
├── assets/
│   ├── css/
│   │   ├── base.css              # Custom properties, reset, typography
│   │   ├── layout.css            # Containers, header, nav, sections, footer
│   │   ├── components.css        # Buttons, cards, badges, accordion, panel
│   │   └── pages/
│   │       └── legal.css         # Only for the privacy and 404 pages
│   ├── js/
│   │   ├── main.js               # Entry point; calls each module's init
│   │   └── modules/
│   │       ├── theme.js          # Light/dark toggle, persisted
│   │       ├── mobile-menu.js    # Side menu, scroll lock, focus return
│   │       ├── faq.js            # Accordion, delegated listener
│   │       └── year.js           # Current year in the footer
│   └── icons/
│       └── favicon.svg           # Site favicon
├── docs/
│   ├── auditoria.md              # Inventory of the project before reorganisation
│   ├── cambios.md                # Change log, grouped by phase
│   └── fuentes/                  # Client-supplied source documents
│       ├── faq-movira.pdf        # Source for the FAQ section
│       └── politica-de-privacidad-movira.pdf   # Source for the privacy pages
├── robots.txt
├── sitemap.xml
├── .gitignore
├── LICENSE
└── README.md
```

`404.html` is the one file that links its assets from the site root (`/assets/...`). The server returns it for any address that does not resolve, including nested ones, where a relative path would break.

## Running it locally

No dependencies and no build. Either of these works:

```bash
# Open the file directly
start index.html          # Windows
open index.html           # macOS

# Or serve it, which is needed to exercise 404.html and the sitemap
npx serve@14 . -l 8000
```

Then visit <http://localhost:8000>.

Pin the version: a bare `npx serve` can pick up a broken global install and fail with `MODULE_NOT_FOUND`. `python -m http.server 8000` is an equivalent fallback.

## Deployment

Deployed on GitHub Pages at [pablowib.github.io/Movira-Landing](https://pablowib.github.io/Movira-Landing).

Static hosting, no configuration file required: point the project at the repository root, leave the build command and the output directory empty. GitHub Pages serves `404.html` for unresolved paths automatically.

If you move the site to another domain, update the absolute URLs in `sitemap.xml`, `robots.txt`, and the `canonical`, `hreflang` and `og:url` tags in the five HTML files.

## Content sources

The FAQ section and both privacy pages are transcriptions of the client documents in `docs/fuentes/`, not rewrites. The privacy policy carries its original date of 25 June 2025. When MOVIRA issues an updated document, replace the PDF and update the corresponding HTML and the visible date together.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
