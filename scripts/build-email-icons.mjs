#!/usr/bin/env node
/**
 * Renders the social icons used by the transactional emails.
 *
 *   node scripts/build-email-icons.mjs
 *
 * Email clients cannot inline SVG reliably, so these have to be raster. They are
 * drawn from the same svelte-icons-pack data the site's footer uses, in the brand
 * primary, so the set stays visually consistent and cannot drift from the icons
 * on the page. 50x50 for a 25px display box, which is what the originals were.
 *
 * Braandly has no entry in the icon pack; its mark comes from BraandlyIcon.svelte.
 */
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const COLOR = '#42489e';
const SIZE = 50;

const pack = readFileSync(join(root, 'node_modules/svelte-icons-pack/dist/fa/index.js'), 'utf8');

function fromPack(name) {
	const match = pack.match(
		new RegExp(`${name}\\s*=\\s*\\{ a: \\{ viewBox: '([^']+)' \\}, c: '([\\s\\S]*?)' \\}`)
	);
	if (!match) throw new Error(`icon not found in pack: ${name}`);
	return { viewBox: match[1], inner: match[2] };
}

function fromBraandlyComponent() {
	const svelte = readFileSync(join(root, 'src/components/elements/BraandlyIcon.svelte'), 'utf8');
	const paths = [...svelte.matchAll(/<path[^>]*\/>/g)].map((m) => m[0]).join('');
	if (!paths) throw new Error('no paths found in BraandlyIcon.svelte');
	// The mark is 24x30; pad it into a square so it optically matches the rest.
	return { viewBox: '-3 0 30 30', inner: paths };
}

const icons = {
	github: fromPack('FaBrandsGithub'),
	linkedin: fromPack('FaBrandsLinkedin'),
	x: fromPack('FaBrandsXTwitter'),
	instagram: fromPack('FaBrandsInstagram'),
	tiktok: fromPack('FaBrandsTiktok'),
	facebook: fromPack('FaBrandsFacebook'),
	braandly: fromBraandlyComponent()
};

const cells = Object.entries(icons)
	.map(
		([name, { viewBox, inner }]) =>
			`<div class="cell" data-name="${name}"><svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="${viewBox}" fill="${COLOR}">${inner}</svg></div>`
	)
	.join('');

const html = `<!doctype html><meta charset="utf-8"><style>
 *{margin:0;padding:0}body{background:transparent}
 .cell{width:${SIZE}px;height:${SIZE}px;display:flex;align-items:center;justify-content:center}
 svg{display:block}
</style>${cells}`;

const work = mkdtempSync(join(tmpdir(), 'email-icons-'));
const page = join(work, 'icons.html');
writeFileSync(page, html);

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
const profile = mkdtempSync(join(tmpdir(), 'icon-profile-'));
const port = 9400 + Math.floor(Math.random() * 90);
const proc = spawn(
	chrome,
	[
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profile}`,
		'--disable-gpu',
		'--hide-scrollbars',
		'--force-device-scale-factor=1',
		`--window-size=200,600`
	],
	{ stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let id = 0;
const rpc = (ws, method, params = {}, sessionId) =>
	new Promise((resolve, reject) => {
		const msgId = ++id;
		const on = (e) => {
			const m = JSON.parse(e.data);
			if (m.id !== msgId) return;
			ws.removeEventListener('message', on);
			if (m.error) reject(new Error(m.error.message));
			else resolve(m.result);
		};
		ws.addEventListener('message', on);
		ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
	});

try {
	let wsUrl;
	for (let i = 0; i < 80; i++) {
		try {
			wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json())
				.webSocketDebuggerUrl;
			break;
		} catch {
			await sleep(150);
		}
	}
	const ws = new WebSocket(wsUrl);
	await new Promise((r, j) => {
		ws.addEventListener('open', r, { once: true });
		ws.addEventListener('error', j, { once: true });
	});
	const { targetId } = await rpc(ws, 'Target.createTarget', { url: 'about:blank' });
	const { sessionId } = await rpc(ws, 'Target.attachToTarget', { targetId, flatten: true });
	const call = (m, p) => rpc(ws, m, p, sessionId);
	await call('Page.enable');
	await call('Runtime.enable');
	await call('Page.navigate', { url: `file://${page}` });
	await sleep(1200);

	for (const name of Object.keys(icons)) {
		const { result } = await call('Runtime.evaluate', {
			expression: `(() => { const el = document.querySelector('[data-name="${name}"]');
				const r = el.getBoundingClientRect();
				return JSON.stringify({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height, scale: 1 }); })()`,
			returnByValue: true
		});
		const { data } = await call('Page.captureScreenshot', {
			format: 'png',
			captureBeyondViewport: true,
			clip: JSON.parse(result.value)
		});
		const out = join(root, 'static', 'email', `${name}.png`);
		writeFileSync(out, Buffer.from(data, 'base64'));
		console.log(`${name}.png  ${(Buffer.from(data, 'base64').length / 1024).toFixed(1)} KB`);
	}
	ws.close();
} finally {
	proc.kill('SIGKILL');
	rmSync(profile, { recursive: true, force: true });
	rmSync(work, { recursive: true, force: true });
}
