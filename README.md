# Portfolio: Ezzoubeir Elasraoui

Static, bilingual (EN `/` · FR `/fr/`) portfolio built with Astro. No framework runtime, no trackers,
Smooth scrolling via Lenis; all motion is hand-written TypeScript.

## Edit content

**Everything visible lives in [`src/data/content.ts`](src/data/content.ts).** Each string is `{ en, fr }`.
Wrap words in `*asterisks*` to render them in the violet-to-aqua gradient accent.

| To change… | Edit |
|---|---|
| Availability pill (or hide it) | `person.availability` |
| Hero headline / text | `hero` |
| Numbers under the hero | `stats` |
| Add / edit a project | `projects` (diagram: `topology`, `pipeline` or `flow`) |
| Services, rates format, languages | `services` |
| Experience, education, certificates | `journey` |

Colours and fonts are tokens at the top of [`src/styles/global.css`](src/styles/global.css)
(`--accent` and `--accent-2` drive the gradient). Fonts: Bricolage Grotesque (display), Geist (body), Geist Mono.

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static files to dist/
```

## Deploy: Vercel + `ezzoubeir.lexiarchive.com`

The repo is connected to Vercel, so every push to `main` deploys automatically.
Settings live in `vercel.json` (Astro preset, `dist/` output, security headers, long cache on hashed assets).

Manual deploy from this folder: `vercel --prod`.

**Subdomain.** The domain's DNS lives on Cloudflare. In Cloudflare → lexiarchive.com → DNS, add:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `ezzoubeir` | `cname.vercel-dns.com` | DNS only (grey cloud) |

Keep it grey-cloud so Vercel can issue the TLS certificate. Nothing else in the zone changes:
the apex and `www` still point at Netlify (Lexi), `api.` is still the tunnel.

> Want a different hostname? Change `site` in `astro.config.mjs` plus the URLs in
> `public/robots.txt` and `public/sitemap.xml`, then add the new domain in Vercel.

## Structure

```
src/data/content.ts        ← all copy (EN + FR)
src/components/            ← one file per section; diagrams/ = animated SVG architecture
src/scripts/topology.ts    ← hero canvas (live infrastructure graph)
src/scripts/motion.ts      ← intro, smooth scroll, reveals, scramble text, velocity marquee,
                             scroll-lit statement, parallax, cursor, ⌘K palette
public/og.png              ← social share image (1200×630)
```

Press **⌘K / Ctrl+K** or **/** anywhere on the site to open the command palette. On mobile the
menu button opens it.
