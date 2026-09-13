#!/usr/bin/env node
/**
 * Full-page (or element) screenshots via the Chrome DevTools Protocol.
 *
 * Uses Node's built-in WebSocket, so it needs no dependencies. The plain
 * `--screenshot` CLI flag only captures the viewport and cannot scroll, which
 * is useless on a page whose hero is `min-h-[100vh]`.
 *
 *   node scripts/screenshot.mjs <url> <out.png> [--width=1280] [--height=900]
 *                                               [--selector="#experience"] [--dark]
 */
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) {
	console.error(
		'usage: screenshot.mjs <url> <out.png> [--width=] [--height=] [--selector=] [--dark]'
	);
	process.exit(1);
}
const flag = (n, d) => {
	const hit = rest.find((a) => a.startsWith(`--${n}=`));
	return hit ? hit.slice(n.length + 3) : d;
};
const width = Number(flag('width', 1280));
const height = Number(flag('height', 900));
const selector = flag('selector', '');
const dark = rest.includes('--dark');

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' }).trim();
const profile = mkdtempSync(join(tmpdir(), 'shot-'));
const port = 9222 + Math.floor(Math.random() * 500);

const proc = spawn(
	chrome,
	[
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profile}`,
		'--disable-gpu',
		'--hide-scrollbars',
		`--window-size=${width},${height}`
	],
	{ stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetUrl() {
	for (let i = 0; i < 80; i++) {
		try {
			const res = await fetch(`http://127.0.0.1:${port}/json/version`);
			return (await res.json()).webSocketDebuggerUrl;
		} catch {
			await sleep(150);
		}
	}
	throw new Error('Chrome never exposed a debugging endpoint');
}

let id = 0;
function rpc(ws, method, params = {}, sessionId) {
	return new Promise((resolve, reject) => {
		const msgId = ++id;
		const onMessage = (event) => {
			const msg = JSON.parse(event.data);
			if (msg.id !== msgId) return;
			ws.removeEventListener('message', onMessage);
			if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
			else resolve(msg.result);
		};
		ws.addEventListener('message', onMessage);
		ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
	});
}

try {
	const ws = new WebSocket(await targetUrl());
	await new Promise((r, j) => {
		ws.addEventListener('open', r, { once: true });
		ws.addEventListener('error', j, { once: true });
	});

	const { targetId } = await rpc(ws, 'Target.createTarget', { url: 'about:blank' });
	const { sessionId } = await rpc(ws, 'Target.attachToTarget', { targetId, flatten: true });
	const call = (m, p) => rpc(ws, m, p, sessionId);

	await call('Page.enable');
	await call('Runtime.enable');
	if (dark) {
		await call('Emulation.setEmulatedMedia', {
			features: [{ name: 'prefers-color-scheme', value: 'dark' }]
		});
	}
	await call('Page.navigate', { url });
	await sleep(3500); // fonts, hydration, tsParticles

	let clip;
	if (selector) {
		const { result } = await call('Runtime.evaluate', {
			expression: `(() => {
				const el = document.querySelector(${JSON.stringify(selector)});
				if (!el) return null;
				const r = el.getBoundingClientRect();
				return JSON.stringify({
					x: r.x + window.scrollX, y: r.y + window.scrollY,
					width: r.width, height: r.height, scale: 1
				});
			})()`,
			returnByValue: true
		});
		if (!result.value) throw new Error(`Selector not found: ${selector}`);
		clip = JSON.parse(result.value);
	}

	const { data } = await call('Page.captureScreenshot', {
		format: 'png',
		captureBeyondViewport: true,
		...(clip ? { clip } : {})
	});
	writeFileSync(out, Buffer.from(data, 'base64'));
	console.log(`${out} (${(Buffer.from(data, 'base64').length / 1024).toFixed(0)} KB)`);
	ws.close();
} catch (err) {
	console.error(`Failed: ${err.message}`);
	process.exitCode = 1;
} finally {
	proc.kill('SIGKILL');
	rmSync(profile, { recursive: true, force: true });
}
