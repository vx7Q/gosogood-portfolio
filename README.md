# GOSOGOOD — Portfolio

A premium, single-page portfolio for **GOSOGOOD**, built as a bespoke, editorial-grade web experience. Dark, minimal, and motion-led: electric accents, glass surfaces, a thin architectural grid, oversized typography, and hand-built project previews.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** for the design system
- **Framer Motion** for reveal, layout, and modal motion
- **Lucide React** for interface icons
- Local SVG assets for technology and social marks
- **Clash Display + Satoshi** (Fontshare) and **JetBrains Mono** (Google Fonts)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

On Windows, double-click **`start-website.bat`** to install dependencies (first run only), start the server, and open the site in your browser automatically.

## Deployment

Pushes to `main` build and deploy the site to GitHub Pages through
`.github/workflows/deploy.yml`. The custom domain is configured in `public/CNAME`
as `gosogood.xyz`.

```bash
npm start         # start the dev server and open the browser
npm run build     # type-check + production bundle
npm run preview   # preview the production build
npm run typecheck # TypeScript only
```

## What is included

- Loader, animated hero, scroll progress, custom cursor, and reduced-motion support
- Sticky navigation with scroll-aware active section and animated pill
- Bento About section, filterable 12-item tech stack, bespoke project previews
- Project case-study modal and an in-site source-code viewer with copy support
- Experience timeline, services accordion + process, contact form, footer
- Responsive layouts for desktop, tablet, and mobile
- SEO metadata, JSON-LD, favicon, and a 1200×630 social share image

Every interactive control is functional. Project cards open a rich case study; **Live Demo** opens the in-site product story rather than linking to an external deployment, and **Source Code** opens a real code excerpt viewer. Nothing depends on fabricated outbound project URLs.

## Structure

```text
src/
  components/
    layout/      Navbar, Footer
    projects/    ProjectPreview, ProjectModal
    ui/          Buttons, Reveal, SplitText, Modal, Toast, SocialLinks, Cursor, …
  hooks/         Clipboard, local time, body scroll lock
  lib/           Site data, project/source content, utilities
  sections/      Hero, About, Skills, Projects, Experience, Services, Contact
public/
  tech/          Technology marks
  social/        Social marks
  favicon.svg
  og-image.png
scripts/
  screenshots.mjs  Playwright visual QA (uses local Chrome)
```

## Customising content

All editable content lives in **`src/lib/data.ts`**:

- `site` — name, role, email, location, social URLs, availability
- `navItems` — primary navigation
- `technologies` — stack cards, categories, levels, notes
- `projects` — case studies, metrics, highlights
- `experience`, `services`, `stats`, `principles`

Project source excerpts are in **`src/lib/snippets.ts`**. Labels, copy, and metadata can be adjusted there.

### Placeholders to replace before launch

The experience is production-quality, but the identity details are intentionally generic placeholders:

- `hello@gosogood.xyz` — contact email used by the form and footer (make sure this mailbox exists)
- `https://github.com/vx7Q`, `https://x.com/gosogood`, and Discord `gosogood` — social links
- `https://gosogood.xyz/` — canonical URL and Open Graph URL in `index.html`
- Project names, copy, metrics, and experience entries are illustrative portfolio content
- Copy in `src/lib/snippets.ts` is sample production-style code, not a real repository

Update these in `src/lib/data.ts` and `index.html` before publishing.

## Contact form

The form validates name, email, service, budget, and message client-side, then opens the visitor's email app via a prefilled `mailto:` link. There is no backend and no data is stored. On submit, the visitor can also copy the composed message.

## Motion and accessibility

- Custom cursor is only enabled for fine pointers (mouse/trackpad) and is disabled for reduced-motion users.
- `prefers-reduced-motion` shortens animations and disables looping motion.
- Navigation, dialogs, forms, and the mobile menu are keyboard accessible; the modal traps focus and closes on `Escape`.
- The site uses semantic landmarks, visible focus states, and descriptive labels.

## Visual QA

With the dev server running:

```bash
node scripts/screenshots.mjs
```

Screenshots are written to `screens/`. The script uses `playwright-core` with the locally installed Chrome at:

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

Adjust `executablePath` in `scripts/screenshots.mjs` if Chrome lives elsewhere.

The social share image can be regenerated from the SVG source with:

```bash
node scripts/og-image.mjs
```
