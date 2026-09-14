#!/usr/bin/env node
/**
 * Renders the Open Graph card to static/personal/og_image.png.
 *
 *   node scripts/build-og-image.mjs
 *
 * The previous og_image.png was 582x371. Every platform that renders a link
 * preview — LinkedIn, X, Slack, iMessage — expects 1200x630, so that image was
 * being upscaled by roughly 2x wherever the site got pasted.
 *
 * Built from the same source of truth as the site: the name and title come from
 * src/data/site.ts, so the card cannot drift from the page it represents.
 * Rendered through headless Chrome, which is already used here for the resume
 * PDFs and the project thumbnails.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

/** Pulled out of site.ts by regex: this script runs outside the Vite graph. */
const site = readFileSync(join(root, 'src/data/site.ts'), 'utf8');
const pick = (name) => {
	const match = site.match(new RegExp(`export const ${name} = '([^']+)'`));
	if (!match) throw new Error(`could not read ${name} from site.ts`);
	return match[1];
};

const SITE_NAME = pick('SITE_NAME');
const AVAILABILITY = pick('AVAILABILITY');

const portrait = readFileSync(join(root, 'static/personal/profile.webp')).toString('base64');
const logo = readFileSync(join(root, 'static/logos/light_logo.svg')).toString('base64');

const html = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: KoHo; src: url('file://${root}/node_modules/@fontsource/koho/files/koho-latin-700-normal.woff2') format('woff2'); font-weight: 700; }
  @font-face { font-family: KoHo; src: url('file://${root}/node_modules/@fontsource/koho/files/koho-latin-400-normal.woff2') format('woff2'); font-weight: 400; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; display: flex; align-items: center; gap: 56px;
         padding: 0 72px; background: #20234d; color: #fff;
         font-family: KoHo, system-ui, sans-serif; overflow: hidden; position: relative; }
  .glow { position: absolute; width: 760px; height: 760px; right: -180px; top: -190px; border-radius: 50%;
          background: radial-gradient(circle, rgba(66,72,158,.55) 0%, rgba(32,35,77,0) 68%); }
  .copy { flex: 1; position: relative; }
  .badge { display: inline-flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 400;
           color: #d0d1e7; border: 1px solid #3b418e; border-radius: 999px; padding: 8px 18px; margin-bottom: 26px; }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #00b74a; }
  h1 { font-size: 66px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; }
  em { font-style: normal; color: #ffa900; }
  p { margin-top: 22px; font-size: 26px; line-height: 1.45; color: #b3b6d8; font-weight: 400; max-width: 26ch; }
  .brand { position: absolute; left: 72px; bottom: 46px; display: flex; align-items: center; gap: 12px;
           font-size: 22px; color: #d0d1e7; }
  .brand img { width: 30px; height: 30px; }
  figure { width: 400px; height: 400px; flex: none; position: relative; }
  figure img { width: 100%; height: 100%; object-fit: contain; }
</style>
<div class="glow"></div>
<div class="copy">
  <span class="badge"><span class="dot"></span>${AVAILABILITY}</span>
  <h1>${SITE_NAME}</h1>
  <p>Fullstack engineer. <em>Front end to infrastructure.</em></p>
</div>
<figure><img src="data:image/webp;base64,${portrait}" alt=""></figure>
<div class="brand"><img src="data:image/svg+xml;base64,${logo}" alt="">ayomideodewale.com</div>`;

const work = mkdtempSync(join(tmpdir(), 'og-'));
const page = join(work, 'og.html');
writeFileSync(page, html);

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
const profile = mkdtempSync(join(tmpdir(), 'og-profile-'));
const out = join(root, 'static/personal/og_image.png');

try {
	execFileSync(
		chrome,
		[
			'--headless=new',
			'--disable-gpu',
			'--hide-scrollbars',
			`--user-data-dir=${profile}`,
			'--force-device-scale-factor=1',
			'--window-size=1200,630',
			'--virtual-time-budget=8000',
			`--screenshot=${out}`,
			`file://${page}`
		],
		{ stdio: 'ignore' }
	);
} finally {
	rmSync(profile, { recursive: true, force: true });
	rmSync(work, { recursive: true, force: true });
}

const dims = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', out], {
	encoding: 'utf8'
})
	.trim()
	.split('\n')
	.slice(1)
	.map((line) => line.trim())
	.join('  ');

console.log(`wrote ${out}\n  ${dims}`);
