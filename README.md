# ayomideodewale.com

Personal site and portfolio for Ayomide Odewale — written case studies of shipped
work, a resume in five variants, and UI design work.

Live at **[www.ayomideodewale.com](https://www.ayomideodewale.com)**. The apex
308-redirects to `www`, which is the canonical form used in canonical tags, Open
Graph URLs and the sitemap.

## Stack

- **SvelteKit 2** with **Svelte 5** (runes), TypeScript in strict mode
- **Tailwind CSS v4** via `@tailwindcss/vite` — the theme lives in `src/app.css`,
  there is no `tailwind.config.js`
- **Vercel** via `@sveltejs/adapter-vercel`. Nearly everything is prerendered;
  only `POST /api/contact` and the dev-only `/r/[variant]` PDF targets run as
  functions
- **Bun** as the package manager (`bun.lock`). Do not mix in npm or yarn

## Running it

```bash
bun install
bun run dev
```

## Scripts

| Command                | What it does                                                               |
| ---------------------- | -------------------------------------------------------------------------- |
| `bun run dev`          | Dev server                                                                 |
| `bun run build`        | Production build; prerenders every static route                            |
| `bun run preview`      | Serve the production build locally                                         |
| `bun run check`        | `svelte-check` against `tsconfig.json`                                     |
| `bun run lint`         | Prettier check plus ESLint                                                 |
| `bun run format`       | Prettier write                                                             |
| `bun run test`         | Vitest, once                                                               |
| `bun run test:watch`   | Vitest, watching                                                           |
| `bun run resume:pdf`   | Rebuild the resume PDFs into `static/r/`                                   |
| `bun run og:build`     | Rebuild all 24 Open Graph cards into `static/og/`                          |
| `bun run icons:build`  | Rebuild the favicon, app icons and web manifest                            |
| `bun run images:build` | Re-encode the `/designs` screenshots to responsive WebP                    |
| `bun run email:build`  | Compile the React Email templates into `src/lib/server/email/templates.ts` |
| `bun run email:dev`    | React Email preview server                                                 |

The four asset scripts all drive the same headless Chrome (`scripts/find-chrome.sh`)
and write into `static/`. **Vercel does not run them**, so their output is
committed. Re-run `og:build` after adding a case study, and `icons:build` after
changing the logo.

## How content works

There is no CMS. Everything is typed data under `src/data/`, imported directly:

- `case-studies.ts` — the 18 long-form write-ups behind `/projects/[slug]`
- `projects.ts` — the cards on `/projects` and the home page
- `resume/roles.ts` — **the single source of truth for work history.** The site's
  experience section (`experience.ts`) and all five resume variants derive from
  it, so the two surfaces cannot disagree
- `menu.ts` — navigation, and the single source of the social profile list that
  `site.ts` derives `SOCIAL_PROFILES` from, so the footer links and the `sameAs`
  in the structured data cannot drift apart
- `site.ts` — titles, descriptions, canonical origin and other SEO constants

## SEO and structured data

`src/components/elements/SEOMeta.svelte` is the only component that writes to the
document head; every route passes it a title, description and a pre-built JSON-LD
graph. The graph builders live in `src/lib/schema.ts` as pure functions with unit
tests in `src/lib/schema.test.ts` — a malformed graph is invisible in a browser
and only surfaces weeks later as a Search Console warning, so it is tested rather
than eyeballed.

`robots.txt`, `sitemap.xml` and `llms.txt` are generated routes, not static files,
so they are built from the same data as the pages they describe.

## Notes

- `docs/csp-notes.md` explains the two deliberate Content Security Policy
  allowances in `vercel.json` before anyone tries to tighten them
- The repo is public and linked from the site footer
