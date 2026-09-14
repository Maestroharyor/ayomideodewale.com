<script lang="ts">
	import type { ResumeDocument } from '../../../types';
	import '../../../styles/resume-print.css';
	import ObfuscatedContact from '../../elements/ObfuscatedContact.svelte';

	let { doc }: { doc: ResumeDocument } = $props();

	/**
	 * A rendering concern, not a data one: `obfuscate` says how this component
	 * should emit the entry, so it lives here rather than on ResumeLink, which
	 * describes what a link *is* and is shared with the PDF builders.
	 */
	type ContactLink = { href: string; display: string; obfuscate?: boolean };

	/** Email, site and profiles as one list, so the separator logic is uniform. */
	const contactLinks: ContactLink[] = $derived([
		// The address is entity-encoded rather than written into the markup: this
		// page is prerendered and in the sitemap, so a plain string here is a
		// scraper target. Flagged per-entry because only this one needs it — the
		// website and profile URLs are meant to be read by machines.
		{ href: `mailto:${doc.contact.email}`, display: doc.contact.email, obfuscate: true },
		{ href: `https://${doc.contact.website}`, display: doc.contact.website },
		...doc.contact.links
	]);

	// Single-column by design. A CSS grid two-column layout can make Chrome
	// interleave the columns in the PDF text stream, which scrambles ATS
	// extraction — the text must come out in reading order.
</script>

<article class="resume-doc">
	<header class="resume-section border-b border-[color:var(--resume-rule)] pb-3">
		<h1 class="text-[17pt] font-bold leading-tight tracking-tight">{doc.contact.name}</h1>
		<p class="text-[10.5pt] font-semibold text-[color:var(--resume-accent)]">{doc.titleLine}</p>
		<p class="mt-1.5 text-[8.2pt] text-[color:var(--resume-muted)]">
			<!-- Encoded for the same reason as the address above. tel: so a phone
			     reader can still dial it straight from the PDF. -->
			<ObfuscatedContact
				value={doc.contact.phone}
				scheme="tel"
				target={doc.contact.phone.replace(/[^+\d]/g, '')}
			/> · {doc.contact.location}
		</p>
		<!--
			The separator is its own element rather than loose text between an anchor
			and an {#each}. Svelte collapses whitespace at block boundaries, so the
			space before the middot was dropped from the second link onward and every
			generated PDF read "github.com/maestroharyor· linkedin.com/...".
		-->
		<p class="text-[8.2pt] text-[color:var(--resume-muted)]">
			{#each contactLinks as link, i (link.href)}{#if i > 0}<span class="resume-sep">
						·
					</span>{/if}{#if link.obfuscate}<ObfuscatedContact
						value={link.display}
						scheme="mailto"
					/>{:else}<a href={link.href}>{link.display}</a>{/if}{/each}
		</p>
	</header>

	<section class="resume-section mt-4">
		<h2
			class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
		>
			Professional Summary
		</h2>
		<p class="mt-1.5">{doc.summary}</p>
	</section>

	<section class="resume-section mt-4">
		<h2
			class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
		>
			Skills
		</h2>
		<dl class="mt-1.5 space-y-1">
			{#each doc.skills as group (group.label)}
				<div class="flex gap-2">
					<dt class="w-[36mm] shrink-0 font-semibold">{group.label}</dt>
					<dd class="flex-1">{group.items.join(' · ')}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="resume-section mt-4">
		<h2
			class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
		>
			Experience
		</h2>
		<div class="mt-1.5 space-y-2.5">
			{#each doc.roles as role (role.id)}
				<div class="resume-role">
					<div class="resume-role__head flex items-baseline justify-between gap-3">
						<h3 class="font-bold">
							{role.role} · {role.company}
							<span class="font-normal text-[color:var(--resume-muted)]">({role.location})</span>
						</h3>
						<span class="shrink-0 text-[8.2pt] text-[color:var(--resume-muted)]">
							{#if role.engagementNote}{role.engagementNote} ·
							{/if}{role.period}
						</span>
					</div>
					<ul class="mt-1 list-disc space-y-0.5 pl-4">
						{#each role.bullets as bullet (bullet)}
							<li>{bullet}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	{#if doc.projects.length}
		<section class="resume-section mt-4">
			<h2
				class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
			>
				Projects
			</h2>
			<ul class="mt-1.5 space-y-1.5">
				{#each doc.projects as project (project.name)}
					<li>
						<span class="font-bold">{project.name}</span>
						{#if project.href}
							<span class="text-[8.2pt] text-[color:var(--resume-muted)]">
								({project.href.replace(/^https?:\/\//, '')})
							</span>
						{/if}
						— {project.summary}
						<span class="text-[8.2pt] text-[color:var(--resume-muted)]">
							{project.stacks.join(' · ')}
						</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<section class="resume-section mt-4">
		<h2
			class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
		>
			Education
		</h2>
		{#each doc.education as entry (entry.institution)}
			<p class="mt-1.5">
				<span class="font-semibold">{entry.institution}</span> — {entry.credential}, {entry.year}
			</p>
		{/each}
	</section>

	<section class="resume-section mt-4">
		<h2
			class="resume-section__title text-[9pt] font-bold uppercase tracking-[0.08em] text-[color:var(--resume-accent)]"
		>
			Certifications
		</h2>
		<ul class="mt-1.5 space-y-0.5">
			{#each doc.certifications as cert (cert.name)}
				<li>{cert.name} — <span class="italic">{cert.status}</span></li>
			{/each}
		</ul>
	</section>
</article>
