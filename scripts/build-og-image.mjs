#!/usr/bin/env node
/**
 * Every Open Graph card the site serves, into static/og/.
 *
 *   node scripts/build-og-image.mjs              # all
 *   node scripts/build-og-image.mjs braandly     # one case study, by slug
 *
 * Re-run this after adding a case study or changing the name, the availability
 * line or the portrait. Vercel does not run it, so the PNGs are committed.
 *
 * There was one card for all 24 indexed URLs: every case study shared anywhere
 * showed the same generic portrait. The design and the geometry are unchanged —
 * 1200x630, which every platform reads (Facebook, LinkedIn and WhatsApp via
 * Open Graph; X via summary_large_image; Discord, Telegram, Slack, iMessage,
 * Bluesky and Mastodon all via Open Graph) — the script just takes parameters
 * now instead of hardcoding one card.
 *
 * Safe zone: X overlays the post title on the card image, and has put it in the
 * top band and in the bottom-left across different releases. Anything that must
 * be readable lives in the vertical middle.
 *
 * Built from the same source of truth as the site: the copy comes from
 * src/data/*.ts, so a card cannot drift from the page it represents. Rendered
 * through headless Chrome, already used here for the resume PDFs, the project
 * thumbnails and the icon set.
 *
 * Note the CSP in vercel.json is `img-src 'self' data:`, so every asset here is
 * read from disk and inlined as a data: URI. No remote fetches.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = join(root, 'static/og');

/** Pulled out of src/data by regex: this script runs outside the Vite graph. */
const readSource = (file) => readFileSync(join(root, 'src/data', file), 'utf8');
const site = readSource('site.ts');
const pick = (name) => {
	const match = site.match(new RegExp(`export const ${name} =\\s*'([^']+)'`));
	if (!match) throw new Error(`could not read ${name} from site.ts`);
	return match[1];
};

const SITE_NAME = pick('SITE_NAME');
const AVAILABILITY = pick('AVAILABILITY');

/**
 * Case studies, parsed from the TypeScript rather than imported. Only the three
 * fields the card shows, so the regex stays something a reader can check.
 */
const parseStudies = () => {
	const source = readSource('case-studies.ts');
	const studies = [];
	const slugRe = /\n\t\{\n\t\tslug: '([^']+)'/g;
	let match;
	const starts = [];
	while ((match = slugRe.exec(source))) starts.push({ slug: match[1], at: match.index });

	starts.forEach(({ slug, at }, index) => {
		const block = source.slice(at, starts[index + 1]?.at ?? source.length);
		const field = (name) => block.match(new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1];
		const stacks = block.match(/stacks: \[([\s\S]*?)\]/)?.[1] ?? '';
		studies.push({
			slug,
			title: field('title') ?? slug,
			tagline: (field('tagline') ?? '').replace(/\\'/g, "'"),
			img: field('img'),
			stacks: [...stacks.matchAll(/'([^']+)'/g)].map((m) => m[1]).slice(0, 5)
		});
	});
	return studies;
};

const dataUri = (path, mime) =>
	`data:${mime};base64,${readFileSync(join(root, path)).toString('base64')}`;

const portrait = dataUri('static/personal/profile.webp', 'image/webp');
const logo = dataUri('static/logos/light_logo.svg', 'image/svg+xml');

/** Stack logos, best-effort: a card is not worth failing over a missing icon. */
const stackIcon = (name) => {
	const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
	for (const candidate of [slug, slug.replace('js', ''), `${slug}js`]) {
		try {
			return dataUri(`static/svgs/${candidate}.svg`, 'image/svg+xml');
		} catch {
			/* try the next spelling */
		}
	}
	return null;
};

const escape = (text) =>
	String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const SHELL = `
  @font-face { font-family: KoHo; src: url('file://${root}/node_modules/@fontsource/koho/files/koho-latin-700-normal.woff2') format('woff2'); font-weight: 700; }
  @font-face { font-family: KoHo; src: url('file://${root}/node_modules/@fontsource/koho/files/koho-latin-400-normal.woff2') format('woff2'); font-weight: 400; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #20234d; color: #fff;
         font-family: KoHo, system-ui, sans-serif; overflow: hidden; position: relative; }
  .glow { position: absolute; width: 760px; height: 760px; right: -180px; top: -190px; border-radius: 50%;
          background: radial-gradient(circle, rgba(66,72,158,.55) 0%, rgba(32,35,77,0) 68%); }
  em { font-style: normal; color: #ffa900; }
  .brand { position: absolute; left: 72px; bottom: 46px; display: flex; align-items: center; gap: 12px;
           font-size: 22px; color: #d0d1e7; }
  .brand img { width: 30px; height: 30px; }
`;

/** The original portrait card, unchanged. Used for / and as the fallback. */
const defaultCard = () => `<!doctype html><meta charset="utf-8">
<style>${SHELL}
  body { display: flex; align-items: center; gap: 56px; padding: 0 72px; }
  .copy { flex: 1; position: relative; }
  .badge { display: inline-flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 400;
           color: #d0d1e7; border: 1px solid #3b418e; border-radius: 999px; padding: 8px 18px; margin-bottom: 26px; }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #00b74a; }
  h1 { font-size: 66px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; }
  p { margin-top: 22px; font-size: 26px; line-height: 1.45; color: #b3b6d8; font-weight: 400; max-width: 26ch; }
  figure { width: 400px; height: 400px; flex: none; position: relative; }
  figure img { width: 100%; height: 100%; object-fit: contain; }
</style>
<div class="glow"></div>
<div class="copy">
  <span class="badge"><span class="dot"></span>${escape(AVAILABILITY)}</span>
  <h1>${escape(SITE_NAME)}</h1>
  <p>Fullstack engineer. <em>Front end to infrastructure.</em></p>
</div>
<figure><img src="${portrait}" alt=""></figure>
<div class="brand"><img src="${logo}" alt="">ayomideodewale.com</div>`;

/**
 * Section cards: a kicker, the page title and one line of context. Text sits in
 * the middle band, clear of where X overlays its own title.
 */
const sectionCard = ({ kicker, title, blurb }) => `<!doctype html><meta charset="utf-8">
<style>${SHELL}
  body { display: flex; flex-direction: column; justify-content: center; padding: 0 72px; }
  .kicker { font-size: 22px; letter-spacing: .18em; text-transform: uppercase; color: #8f93c8; margin-bottom: 22px; }
  h1 { font-size: 78px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; max-width: 18ch; }
  p { margin-top: 26px; font-size: 28px; line-height: 1.4; color: #b3b6d8; font-weight: 400; max-width: 30ch; }
</style>
<div class="glow"></div>
<div class="kicker">${escape(kicker)}</div>
<h1>${escape(title)}</h1>
<p>${escape(blurb)}</p>
<div class="brand"><img src="${logo}" alt="">ayomideodewale.com</div>`;

/**
 * Case-study cards: title and tagline on the left, the project's own thumbnail
 * on the right, stack marks along the bottom. The thumbnail is what makes a
 * reshared link look like the specific project rather than the site in general.
 */
const studyCard = (study) => {
	const shot = study.img ? dataUri(join('static', study.img), 'image/webp') : null;
	const icons = study.stacks
		.map((name) => ({ name, uri: stackIcon(name) }))
		.filter((entry) => entry.uri);

	return `<!doctype html><meta charset="utf-8">
<style>${SHELL}
  body { display: flex; align-items: center; gap: 54px; padding: 0 72px 0 72px; }
  .copy { flex: 1; min-width: 0; }
  .kicker { font-size: 20px; letter-spacing: .18em; text-transform: uppercase; color: #8f93c8; margin-bottom: 20px; }
  h1 { font-size: 60px; line-height: 1.06; font-weight: 700; letter-spacing: -0.02em; }
  p { margin-top: 20px; font-size: 25px; line-height: 1.4; color: #b3b6d8; font-weight: 400; max-width: 24ch; }
  .stacks { display: flex; align-items: center; gap: 14px; margin-top: 34px; }
  .stacks img { width: 34px; height: 34px; object-fit: contain;
                background: rgba(255,255,255,.92); border-radius: 8px; padding: 5px; }
  figure { width: 470px; flex: none; border-radius: 14px; overflow: hidden;
           border: 2px solid #3b418e; box-shadow: 0 24px 60px rgba(0,0,0,.35); }
  figure img { width: 100%; display: block; aspect-ratio: 1000/508; object-fit: cover; object-position: top; }
  .brand { left: auto; right: 72px; }
</style>
<div class="glow"></div>
<div class="copy">
  <div class="kicker">Case study</div>
  <h1>${escape(study.title)}</h1>
  <p>${escape(study.tagline)}</p>
  <div class="stacks">${icons.map((i) => `<img src="${i.uri}" alt="">`).join('')}</div>
</div>
${shot ? `<figure><img src="${shot}" alt=""></figure>` : ''}
<div class="brand"><img src="${logo}" alt="">ayomideodewale.com</div>`;
};

const SECTIONS = [
	{
		name: 'projects',
		kicker: 'Portfolio',
		title: 'Projects',
		blurb: 'Shipped work, each with a written case study behind it.'
	},
	{
		name: 'designs',
		kicker: 'Interface work',
		title: 'UI Designs',
		blurb: 'Interface concepts and product screens, designed and built.'
	},
	{
		name: 'cloud',
		kicker: 'Infrastructure',
		title: 'Cloud & Platform',
		blurb: 'AWS, Terraform, Docker, CI and self-hosted monitoring in Go.'
	},
	{
		name: 'resume',
		kicker: 'Experience',
		title: 'Resume',
		blurb: '7 years across fintech and enterprise platforms.'
	},
	{
		name: 'contact',
		kicker: 'Say hello',
		title: 'Get in touch',
		blurb: 'Questions, proposals, or just hello.'
	}
];

const only = process.argv[2];
const studies = parseStudies();

const jobs = [
	{ file: 'default.png', html: defaultCard() },
	...SECTIONS.map((section) => ({ file: `${section.name}.png`, html: sectionCard(section) })),
	...studies.map((study) => ({ file: `projects-${study.slug}.png`, html: studyCard(study) }))
].filter((job) => !only || job.file.includes(only));

if (jobs.length === 0) {
	console.error(`no cards matched "${only}"`);
	process.exit(1);
}

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
const work = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(outDir, { recursive: true });

try {
	for (const job of jobs) {
		const page = join(work, `${job.file}.html`);
		writeFileSync(page, job.html);
		const out = join(outDir, job.file);
		const profile = mkdtempSync(join(tmpdir(), 'og-profile-'));
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
		}
		console.log(`${job.file.padEnd(34)} ${(statSync(out).size / 1024).toFixed(0)} KB`);
	}
} finally {
	rmSync(work, { recursive: true, force: true });
}

console.log(`\n${jobs.length} cards in static/og/`);
