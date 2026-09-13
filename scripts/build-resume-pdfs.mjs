#!/usr/bin/env node
/**
 * Renders every resume variant to PDF with headless Chrome.
 *
 * Zero dependencies: it drives a Chrome binary already on disk (see
 * scripts/find-chrome.sh) against a local `vite dev` server.
 *
 * Why dev rather than preview: only /resume ships as a page. The other four
 * variants render at /r/<variant>, which is guarded on `dev` so it does not
 * exist in production at all. Print CSS is unaffected by the dev/prod
 * minification difference.
 *
 * Not wired into `build` on purpose: Vercel's build container has no Chrome,
 * and static/ is read at build time anyway. PDFs are generated locally and
 * committed, like any other static asset.
 *
 *   node scripts/build-resume-pdfs.mjs                  # all five
 *   node scripts/build-resume-pdfs.mjs --only=cloud     # one
 *   node scripts/build-resume-pdfs.mjs --base=http://localhost:5173
 */
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { openSync, readSync, closeSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

/** Kept in step with src/data/resume/variants.ts. */
const VARIANTS = [
	{ id: 'fullstack', url: '/resume', out: 'static/resume.pdf' },
	{ id: 'backend', url: '/r/backend', out: 'static/r/resume-backend.pdf' },
	{ id: 'frontend', url: '/r/frontend', out: 'static/r/resume-frontend.pdf' },
	{ id: 'mobile', url: '/r/mobile', out: 'static/r/resume-mobile.pdf' },
	{ id: 'cloud', url: '/r/cloud', out: 'static/r/resume-cloud.pdf' }
];

const args = process.argv.slice(2);
const argValue = (name) => {
	const hit = args.find((a) => a.startsWith(`--${name}=`));
	return hit ? hit.slice(name.length + 3) : undefined;
};

const only = argValue('only');
const providedBase = argValue('base');
const PORT = Number(argValue('port') ?? 4318);

const selected = only ? VARIANTS.filter((v) => only.split(',').includes(v.id)) : VARIANTS;
if (selected.length === 0) {
	console.error(`No variants matched --only=${only}`);
	process.exit(1);
}

function findChrome() {
	if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
	return execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
}

async function waitForServer(base, timeoutMs = 90_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(`${base}/resume`, { redirect: 'manual' });
			if (res.status < 500) return;
		} catch {
			// Not listening yet.
		}
		await new Promise((r) => setTimeout(r, 300));
	}
	throw new Error(`Dev server never became ready at ${base}`);
}

/** A blank page is still a "successful" --print-to-pdf, so verify the bytes. */
function verifyPdf(path) {
	const { size } = statSync(path);
	if (size < 10_000) throw new Error(`${path} is only ${size} bytes — probably a blank render`);
	const fd = openSync(path, 'r');
	const head = Buffer.alloc(4);
	readSync(fd, head, 0, 4, 0);
	closeSync(fd);
	if (head.toString('latin1') !== '%PDF') throw new Error(`${path} is not a PDF`);
	return size;
}

function renderPdf(chrome, url, outPath) {
	// A fresh profile is not optional: without it Chrome hands the URL to an
	// already-running instance and silently ignores --print-to-pdf.
	const profile = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
	try {
		execFileSync(
			chrome,
			[
				'--headless',
				'--disable-gpu',
				'--hide-scrollbars',
				`--user-data-dir=${profile}`,
				'--no-pdf-header-footer',
				'--run-all-compositor-stages-before-draw',
				'--virtual-time-budget=15000',
				`--print-to-pdf=${outPath}`,
				url
			],
			{ stdio: 'ignore', timeout: 120_000 }
		);
	} finally {
		rmSync(profile, { recursive: true, force: true });
	}
}

let server;
try {
	const base = providedBase ?? `http://localhost:${PORT}`;

	if (!providedBase) {
		console.log(`Starting dev server on ${PORT}…`);
		server = spawn('bun', ['run', 'vite', 'dev', '--port', String(PORT), '--strictPort'], {
			cwd: root,
			stdio: 'ignore',
			detached: false
		});
		await waitForServer(base);
	}

	const chrome = findChrome();
	console.log(`Chrome: ${chrome}\n`);

	mkdirSync(join(root, 'static/r'), { recursive: true });

	for (const variant of selected) {
		const outPath = join(root, variant.out);
		renderPdf(chrome, `${base}${variant.url}`, outPath);
		const size = verifyPdf(outPath);
		console.log(
			`  ${variant.id.padEnd(10)} ${variant.out.padEnd(32)} ${(size / 1024).toFixed(0)} KB`
		);
	}

	console.log('\nAll PDFs rendered. Open each one — a broken page prints blank, not failed.');
} catch (err) {
	console.error(`\nFailed: ${err.message}`);
	process.exitCode = 1;
} finally {
	if (server) {
		server.kill('SIGTERM');
		setTimeout(() => server.kill('SIGKILL'), 3000).unref?.();
	}
}
