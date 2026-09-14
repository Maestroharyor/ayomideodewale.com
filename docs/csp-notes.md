# Content Security Policy notes

The policy lives in `vercel.json`. Two allowances are deliberate and worth
knowing about before anyone tightens them:

- **`script-src 'unsafe-inline'`** — required by the anti-FOUC snippet in
  `src/app.html` and by SvelteKit's hydration bootstrap, both of which are
  inline. Removing it means moving to nonces, which `adapter-vercel` cannot
  currently emit for a prerendered page. Tightening this is a real improvement,
  just not a one-line one.
- **`style-src 'unsafe-inline'`** — required by Svelte's scoped style injection
  and not realistically removable.

## `img-src 'self' data:`

The `https://placehold.co` allowance this file used to document is gone: every
project has a real thumbnail in `static/projects/` now, and the policy is back to
`img-src 'self' data:`.

That constraint is worth knowing about before adding any imagery. Nothing loads
from a third-party host, which is why the Open Graph cards, the favicon set and
the project thumbnails are all generated into `static/` by the build scripts,
with their own assets inlined as `data:` URIs rather than fetched:

- `bun run og:build` — `scripts/build-og-image.mjs`
- `bun run icons:build` — `scripts/build-icons.mjs`
- `bun run images:build` — `scripts/build-design-images.mjs`

A card or icon that reaches out to a CDN will render fine in the generator, which
runs from `file://`, and then fail silently in production.
