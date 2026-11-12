# _gosogood

A personal single-page site for **`_gosogood`** — Borriwat Phumiekhian, a student in Suphan Buri, Thailand.

The site is a motion-led build with a three-colour palette, CSS/SVG-only visuals, and no trackers. Project previews are drawn with HTML and CSS instead of screenshots, so the only image assets are the favicon and the social share card.

## Live

- Site: [gosogood.xyz](https://gosogood.xyz/)
- GitHub: [github.com/vx7Q](https://github.com/vx7Q)
- Instagram: [@_gosogood](https://www.instagram.com/_gosogood/)
- X: [@gosogood](https://x.com/gosogood)
- Discord: `l9eve`

## Projects

- [_gosogood portfolio](https://gosogood.xyz/) — live — [source](https://github.com/vx7Q/gosogood-portfolio)
- [Pass Forge Pro](https://pass-forge-pro.netlify.app/) — live 24/7 — password and passphrase generator, runs in the browser
- [Warp.exe](https://warp-exe.netlify.app/) — retired — kept online as an archive
- [project / landing](https://vx7q.github.io/project/) — live — [source](https://github.com/vx7Q/project)

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://127.0.0.1:5173`.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Structure

```text
src/
  components/
    layout/        Navbar, footer
    projects/      CSS previews and the case-study modal
    ui/            Buttons, marquee, reveal, logo, toast, etc.
  hooks/           Local time, clipboard, active section, body lock
  lib/
    data.ts        All real content, links, and project data
    scroll.ts      Header-aware smooth scrolling
    utils.ts       Class-name helper
  sections/        Hero, About, Toolkit, Projects, Journey, Skills, Contact
  App.tsx
  index.css        Design tokens, utilities, animations
index.html         SEO, JSON-LD, fonts, Open Graph metadata
public/
  favicon.svg
  og-image.png     Social share card (1200 × 630)
```

## Content

Everything shown on the site is real and lives in `src/lib/data.ts`:

- Public name: `_gosogood`
- Real name: บริวัฒน์ ภูมีเขียน / Borriwat Phumiekhian
- Born 14 May 2009; age is calculated at runtime
- Based in Suphan Buri, Thailand
- Studying at วิทยาลัยการอาชีพสองพี่น้อง (Songphinong Industrial and Community Education College)
- Started web development in Matthayom 3
- Four public builds: three live, one retired
- Interests: PUBG on PC, music, esports, and unfinished side projects
- Languages: Thai (native), English (still learning)
- Status: not taking work right now

There are no invented clients, awards, testimonials, senior titles, or fabricated metrics. Pass Forge history is stored locally in the browser with `localStorage`; it is not sent to a server.

## Deploy

The site deploys to GitHub Pages from `main`. A push triggers `.github/workflows/deploy.yml`, which runs `npm ci`, builds `dist/`, and publishes it. The custom domain is kept in `public/CNAME` (`gosogood.xyz`).

## Notes

- The contact form validates locally, composes a message, and opens the visitor's email app with `mailto:`. There is no backend and no message is sent automatically.
- Motion respects `prefers-reduced-motion`.
- The site uses no analytics, cookies, or trackers.
- To update the site content, edit `src/lib/data.ts` first — most sections read from it.
