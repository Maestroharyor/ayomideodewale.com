#!/usr/bin/env node
/**
 * The favicon and app-icon set.
 *
 *   node scripts/build-icons.mjs
 *
 * The site shipped one SVG favicon and nothing else. Google's favicon crawler
 * does not accept SVG — its documented formats are BMP, GIF, ICO, PNG, JPEG,
 * PPM and TIFF — so an SVG-only declaration earns a default globe in search
 * results. iOS ignores SVG favicons below Safari 26 and composites transparency
 * onto black, and Chromium needs a 192 and a 512 in the manifest before it will
 * offer to install anything.
 *
 * Rendered through the same headless Chrome as the OG card and the resume PDFs,
 * from the same mark in static/logos/light_logo.svg, so the icon set cannot
 * drift from the logo in the header.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const staticDir = join(root, 'static');

const BRAND = '#42489e';
const mark = readFileSync(join(staticDir, 'logos/light_logo.svg'), 'utf8');

/** The mark without its own rounded rect, for surfaces that apply their own mask. */
const glyph = mark.replace(/<rect[^>]*\/>/, '').replace(/fill="white"/g, `fill="#ffffff"`);

/**
 * `padding` is the share of the canvas left empty around the mark.
 *
 * apple-touch-icon gets 11% (~20px at 180) and square corners, because iOS
 * applies its own mask and a pre-rounded source double-rounds. The maskable
 * icon gets 20%, which keeps the art inside the 409x409 safe circle the spec
 * guarantees is visible on every Android mask shape.
 */
const page = ({ size, padding, radius }) => `<!doctype html><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; }
  html, body { width: ${size}px; height: ${size}px; }
  body { background: transparent; }
  .plate {
    width: ${size}px; height: ${size}px;
    background: ${BRAND};
    border-radius: ${radius}px;
    display: flex; align-items: center; justify-content: center;
  }
  svg { width: ${Math.round(size * (1 - padding * 2))}px; height: auto; display: block; }
</style>
<div class="plate">${glyph}</div>`;

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
const work = mkdtempSync(join(tmpdir(), 'icons-'));

const shoot = (out, opts) => {
	const html = join(work, `${opts.size}-${opts.radius}.html`);
	writeFileSync(html, page(opts));
	const profile = mkdtempSync(join(tmpdir(), 'icons-profile-'));
	try {
		execFileSync(
			chrome,
			[
				'--headless=new',
				'--disable-gpu',
				'--hide-scrollbars',
				'--default-background-color=00000000',
				`--user-data-dir=${profile}`,
				'--force-device-scale-factor=1',
				`--window-size=${opts.size},${opts.size}`,
				'--virtual-time-budget=4000',
				`--screenshot=${out}`,
				`file://${html}`
			],
			{ stdio: 'ignore' }
		);
	} finally {
		rmSync(profile, { recursive: true, force: true });
	}
};

/**
 * A one-image ICO wrapping a PNG: 6-byte header, one 16-byte directory entry,
 * then the PNG bytes verbatim. Every browser since IE11, and Google's crawler,
 * read PNG-in-ICO, so this needs no encoder and no dependency.
 */
const ico = (pngPath, outPath) => {
	const png = readFileSync(pngPath);
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type: icon
	header.writeUInt16LE(1, 4); // one image
	const entry = Buffer.alloc(16);
	entry.writeUInt8(32, 0); // width  (32, not 0 — 0 would mean 256)
	entry.writeUInt8(32, 1); // height
	entry.writeUInt8(0, 2); // palette colours
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // colour planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(png.length, 8);
	entry.writeUInt32LE(header.length + entry.length, 12);
	writeFileSync(outPath, Buffer.concat([header, entry, png]));
};

const kb = (p) => `${(statSync(p).size / 1024).toFixed(1)} KB`;

try {
	mkdirSync(staticDir, { recursive: true });

	// Keeps its own rounded corners: browsers draw a favicon unmasked.
	const favPng = join(work, 'favicon-32.png');
	shoot(favPng, { size: 32, padding: 0, radius: 4 });
	ico(favPng, join(staticDir, 'favicon.ico'));

	// Square corners and padding: iOS masks it itself, and a pre-rounded source
	// double-rounds. Opaque, because iOS composites transparency onto black.
	shoot(join(staticDir, 'apple-touch-icon.png'), { size: 180, padding: 0.11, radius: 0 });

	shoot(join(staticDir, 'icon-192.png'), { size: 192, padding: 0, radius: 24 });
	shoot(join(staticDir, 'icon-512.png'), { size: 512, padding: 0, radius: 64 });

	// Art inside the central 409x409 circle, which is the only region every
	// Android mask shape is guaranteed to show.
	shoot(join(staticDir, 'icon-mask.png'), { size: 512, padding: 0.2, radius: 0 });

	// The SVG the modern browsers prefer. Copied rather than linked so /icon.svg
	// is a stable root path independent of where the logo lives.
	writeFileSync(join(staticDir, 'icon.svg'), mark);

	writeFileSync(
		join(staticDir, 'manifest.webmanifest'),
		JSON.stringify(
			{
				name: 'Ayomide Odewale',
				short_name: 'Ayomide',
				description: 'Fullstack engineer. TypeScript, Go, AWS.',
				start_url: '/',
				// `browser`, not `standalone`: this is a portfolio, not an app, and a
				// site that opens chromeless from the home screen loses the back button.
				display: 'browser',
				background_color: '#20234d',
				theme_color: '#20234d',
				icons: [
					{ src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
					{ src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
					// Separate entry rather than `purpose: "any maskable"`: one image
					// cannot be well-cropped for both, and an unrecognised purpose makes
					// a browser skip the icon entirely.
					{ src: '/icon-mask.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' }
				]
			},
			null,
			// Tabs, matching .prettierrc: this file is committed, and `bun run lint`
			// checks it like any other, so the generator has to emit the house style.
			'\t'
		) + '\n'
	);
} finally {
	rmSync(work, { recursive: true, force: true });
}

for (const name of [
	'favicon.ico',
	'icon.svg',
	'apple-touch-icon.png',
	'icon-192.png',
	'icon-512.png',
	'icon-mask.png',
	'manifest.webmanifest'
]) {
	console.log(`${name.padEnd(24)} ${kb(join(staticDir, name))}`);
}
