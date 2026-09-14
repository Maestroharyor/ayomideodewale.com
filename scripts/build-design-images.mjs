#!/usr/bin/env node
/**
 * Responsive WebP for the /designs shots.
 *
 *   node scripts/build-design-images.mjs
 *
 * The sources are 1920x1440 PNGs at ~250 KB each, roughly 757 KB for the page.
 * DesignCard renders them in a max-w-[500px] box, so the largest useful size is
 * 1000px (2x of 500) — the extra 920px of width was being downloaded and thrown
 * away on every visit.
 *
 * Resize first, then re-encode. Re-encoding alone at 1920px would reach maybe
 * 120 KB; resizing to 1000px reaches a fraction of that, and the format change
 * is the smaller half of the win.
 *
 * Sources live in assets/design-sources/, outside static/, so the originals are
 * kept without being deployed.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
/**
 * Sources live outside static/ on purpose. They are the only full-resolution
 * copies and must be kept — regenerating from a downscaled WebP would compound
 * the loss — but nothing references them, so leaving them in static/ shipped
 * ~757 KB of unreachable PNG to the CDN on every deploy.
 */
const sourceDir = join(root, 'assets/design-sources');
const dir = join(root, 'static/designs');

/** Matches the `image` / `imageSmall` pair each entry in src/data/designs.ts declares. */
const WIDTHS = [
	{ width: 1000, suffix: '' },
	{ width: 500, suffix: '-500' }
];

const slugs = ['data_mirror', 'lifetechfacts', 'braandly'];

const kb = (path) => `${(statSync(path).size / 1024).toFixed(1)} KB`;

let before = 0;
let after = 0;

for (const slug of slugs) {
	const source = join(sourceDir, `${slug}.png`);
	if (!existsSync(source)) {
		console.error(`missing source: ${source}`);
		process.exitCode = 1;
		continue;
	}
	before += statSync(source).size;

	for (const { width, suffix } of WIDTHS) {
		const scratch = join(dir, `.${slug}${suffix}.tmp.png`);
		const out = join(dir, `${slug}${suffix}.webp`);

		execFileSync('sips', ['--resampleWidth', String(width), source, '--out', scratch], {
			stdio: 'ignore'
		});
		// q=82: these are UI screenshots, so text edges matter more than photographic
		// gradients. Below 80 the type in the smaller variant starts to fringe.
		execFileSync('cwebp', ['-quiet', '-q', '82', scratch, '-o', out]);
		execFileSync('rm', ['-f', scratch]);

		after += statSync(out).size;
		console.log(`${slug}${suffix}.webp  ${width}px  ${kb(out)}`);
	}
}

console.log(
	`\nsources ${(before / 1024).toFixed(0)} KB  ->  generated ${(after / 1024).toFixed(0)} KB`
);
