#!/usr/bin/env node
/**
 * Designed thumbnails for the projects that have no site to photograph.
 *
 * CLI tools, dead domains and private repos were all falling back to grey
 * placehold.co boxes, which read as missing rather than deliberate. These are
 * rendered from an HTML template with the site's own palette and captured by
 * the same headless Chrome that shoots the live-site thumbnails, at the same
 * 1000x508 geometry, so the grid stays uniform.
 *
 *   node scripts/build-project-thumbnails.mjs            # all
 *   node scripts/build-project-thumbnails.mjs supabase-pings
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const PALETTE = {
	ink: '#20234d',
	inkDeep: '#171a3d',
	primary: '#42489e',
	primaryLight: '#7b7fbb',
	warning: '#ffa900',
	go: '#00add8',
	flutter: '#47c5fb',
	python: '#ffd343',
	npm: '#cb3837'
};

/** Inlined so the capture never depends on the dev server being up. */
const svg = (name) => readFileSync(join(root, 'static/svgs', `${name}.svg`), 'utf8');

const terminal = (accent, name, lines, mark = 'go') => `
	<div class="card">
		<div class="chrome"><i></i><i></i><i></i><span>${name}</span></div>
		<pre>${lines.map((l) => `<span>${l}</span>`).join('\n')}</pre>
	</div>
	<div class="mark" style="--accent:${accent}">${svg(mark)}</div>`;

const wireframe = (rows) => `
	<div class="card wire">
		<div class="chrome"><i></i><i></i><i></i></div>
		<div class="wirebody">${rows}</div>
	</div>`;

const THUMBS = {
	'youtube-scheduler': {
		accent: PALETTE.python,
		title: 'youtube-scheduler',
		subtitle: 'Batch metadata edits you can undo',
		body: terminal(
			PALETTE.python,
			'yt-scheduler',
			[
				'$ yt-scheduler update --from plan.csv --dry-run',
				'<i>reading current state for 24 videos…</i>',
				'<b class="ok">merge</b> title      12 changed',
				'<b class="ok">merge</b> publishAt  24 scheduled',
				'<i>parts sent: snippet,status · run 0f3a logged</i>'
			],
			'python'
		)
	},
	'tailwind-screen-size': {
		accent: PALETTE.warning,
		title: 'tailwind-screen-size',
		subtitle: 'Published on npm · React and Svelte',
		body: `
			<div class="card">
				<div class="chrome"><i></i><i></i><i></i><span>localhost:5173</span></div>
				<div class="wirebody">
					<div class="list">
						<span></span><span></span><span></span>
					</div>
					<div class="badge"><b>lg</b> 1024 &times; 768</div>
				</div>
			</div>`
	},
	'healthcheck-service': {
		accent: PALETTE.go,
		title: 'healthcheck-service',
		subtitle: 'One endpoint, checked on a schedule',
		body: terminal(PALETTE.go, 'healthcheck', [
			'$ healthcheck',
			'<i>watching api.example.com · every 60s</i>',
			'<b class="ok">OK</b>   200   142ms',
			'<b class="ok">OK</b>   200    38ms',
			'<b class="bad">DOWN</b> 503   dial timeout · alert sent'
		])
	},
	'supabase-pings': {
		accent: PALETTE.go,
		title: 'supabase-pings',
		subtitle: 'Keeps free-tier projects awake',
		body: terminal(PALETTE.go, 'supabase-pings', [
			'$ supabase-pings',
			'<i>loaded 4 projects from config</i>',
			'<b class="ok">ping</b> project-a   204   61ms',
			'<b class="ok">ping</b> project-b   204   77ms',
			'<i>next run in 6h</i>'
		])
	},
	virem: {
		accent: PALETTE.warning,
		title: 'Virem',
		subtitle: 'Multivendor marketplace',
		body: wireframe(
			`<div class="grid">${Array.from({ length: 6 }, () => '<span></span>').join('')}</div>`
		)
	}
};

const page = (t) => `<!doctype html>
<meta charset="utf-8" />
<style>
	* { box-sizing: border-box; margin: 0; }
	html, body { width: 2000px; height: 1016px; }
	body {
		display: grid; grid-template-columns: 1fr 1.05fr; align-items: center; gap: 70px;
		padding: 96px 104px;
		background:
			radial-gradient(1100px 620px at 88% -12%, rgba(66, 72, 158, 0.55), transparent 62%),
			radial-gradient(760px 520px at -8% 108%, rgba(123, 127, 187, 0.22), transparent 60%),
			${PALETTE.ink};
		color: #fff;
		font-family: 'KoHo', 'Trebuchet MS', system-ui, sans-serif;
		position: relative; overflow: hidden;
	}
	/* Same faint star field as the site background, so these sit in the grid. */
	body::after {
		content: ''; position: absolute; inset: 0; pointer-events: none;
		background-image:
			radial-gradient(2px 2px at 14% 22%, rgba(255,255,255,.5), transparent),
			radial-gradient(2px 2px at 71% 13%, rgba(255,255,255,.35), transparent),
			radial-gradient(2px 2px at 33% 78%, rgba(255,255,255,.3), transparent),
			radial-gradient(2px 2px at 88% 64%, rgba(255,255,255,.4), transparent),
			radial-gradient(2px 2px at 54% 44%, rgba(255,255,255,.25), transparent);
	}
	.meta { position: relative; z-index: 1; }
	.rule { width: 92px; height: 8px; border-radius: 99px; background: ${t.accent}; margin-bottom: 38px; }
	h1 { font-size: 74px; line-height: 1.05; letter-spacing: -0.02em; font-weight: 700; }
	p { margin-top: 26px; font-size: 34px; line-height: 1.4; color: rgba(255,255,255,.72); max-width: 15ch; }
	.stage { position: relative; z-index: 1; }
	.card {
		border-radius: 26px; overflow: hidden;
		background: ${PALETTE.inkDeep};
		border: 2px solid rgba(255,255,255,.14);
		box-shadow: 0 50px 100px rgba(0,0,0,.45);
	}
	.chrome {
		display: flex; align-items: center; gap: 12px;
		padding: 20px 26px; background: rgba(255,255,255,.06);
		border-bottom: 2px solid rgba(255,255,255,.08);
	}
	.chrome i { width: 15px; height: 15px; border-radius: 99px; background: rgba(255,255,255,.26); }
	.chrome span { margin-left: 14px; font-size: 24px; color: rgba(255,255,255,.5); }
	pre {
		padding: 34px 30px; font-size: 25px; line-height: 1.85;
		font-family: 'SF Mono', ui-monospace, Menlo, monospace;
		color: rgba(255,255,255,.82); display: flex; flex-direction: column;
	}
	pre b { font-weight: 700; }
	pre .ok { color: #5ce39b; }
	pre .bad { color: #ff7a7a; }
	pre i { color: rgba(255,255,255,.42); font-style: normal; }
	.mark {
		position: absolute; right: -78px; bottom: -86px; opacity: .16;
		filter: drop-shadow(0 0 60px var(--accent));
	}
	.mark svg { width: 250px; height: 250px; }
	.wirebody { padding: 34px 30px; }
	.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
	.grid span { display: block; height: 130px; border-radius: 14px; background: rgba(255,255,255,.11); }
	.list { display: grid; gap: 20px; }
	.list span { display: block; height: 66px; border-radius: 14px; background: rgba(255,255,255,.11); }
	.phone {
		width: 430px; margin: 0 auto; padding: 30px 26px 34px;
		border-radius: 46px; background: ${PALETTE.inkDeep};
		border: 2px solid rgba(255,255,255,.14); box-shadow: 0 50px 100px rgba(0,0,0,.45);
	}
	.phonebar { width: 120px; height: 10px; border-radius: 99px; background: rgba(255,255,255,.2); margin: 0 auto 34px; }
	.bars { display: flex; align-items: flex-end; gap: 14px; height: 230px; }
	.bars span { flex: 1; border-radius: 8px 8px 3px 3px; background: linear-gradient(180deg, ${t.accent}, rgba(66,72,158,.5)); }
	.rows { margin-top: 34px; display: grid; gap: 16px; }
	.rows em { display: block; height: 20px; border-radius: 99px; background: rgba(255,255,255,.13); }
	.badge {
		margin-top: 26px; display: inline-flex; align-items: center; gap: 14px;
		padding: 16px 26px; border-radius: 14px; font-size: 25px;
		font-family: 'SF Mono', ui-monospace, Menlo, monospace;
		background: rgba(0,0,0,.55); color: rgba(255,255,255,.85);
		border: 2px solid rgba(255,255,255,.16);
	}
	.badge b { color: ${t.accent}; font-weight: 700; }
</style>
<div class="meta">
	<div class="rule"></div>
	<h1>${t.title}</h1>
	<p>${t.subtitle}</p>
</div>
<div class="stage">${t.body}</div>`;

const chrome = execFileSync(join(here, 'find-chrome.sh'), { encoding: 'utf8' })
	.trim()
	.split('\n')
	.pop();
const only = process.argv.slice(2);
const names = only.length ? only : Object.keys(THUMBS);

for (const name of names) {
	const thumb = THUMBS[name];
	if (!thumb) {
		console.error(`unknown thumbnail: ${name}`);
		process.exitCode = 1;
		continue;
	}
	const scratch = mkdtempSync(join(tmpdir(), `thumb-${name}-`));
	const html = join(scratch, 'index.html');
	const png = join(scratch, 'shot.png');
	const out = join(root, 'static/projects', `${name}.webp`);
	writeFileSync(html, page(thumb));
	try {
		execFileSync(
			chrome,
			[
				'--disable-gpu',
				'--hide-scrollbars',
				`--user-data-dir=${join(scratch, 'profile')}`,
				'--window-size=2000,1016',
				`--screenshot=${png}`,
				`file://${html}`
			],
			{ stdio: 'ignore' }
		);
		execFileSync('sips', ['--resampleWidth', '1000', png, '--out', png], { stdio: 'ignore' });
		execFileSync('cwebp', ['-quiet', '-q', '86', png, '-o', out]);
		console.log(`  ${name.padEnd(22)} static/projects/${name}.webp`);
	} finally {
		rmSync(scratch, { recursive: true, force: true });
	}
}
