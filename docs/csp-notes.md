# Content Security Policy notes

The policy lives in `vercel.json`. Two allowances are deliberate and worth
knowing about before anyone tightens them:

- **`script-src 'unsafe-inline'`** — required by the anti-FOUC snippet in
  `src/app.html` and by SvelteKit's hydration bootstrap, both of which are
  inline. Removing it means moving to nonces, which `adapter-vercel` cannot
  currently emit for a prerendered page. Tightening this is a real improvement,
  just not a one-line one.
- **`img-src https://placehold.co`** — several projects still use placeholder
  thumbnails. Once every project has a real screenshot in `static/projects/`,
  drop this and the policy becomes `img-src 'self' data:`.

`style-src 'unsafe-inline'` is required by Svelte's scoped style injection and
is not realistically removable.
