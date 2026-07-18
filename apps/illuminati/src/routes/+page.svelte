<script lang="ts">
	import { getContext } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
	import type { PreferencesState } from '$lib/state/preferences.svelte.js';

	const prefs = getContext<PreferencesState>('preferences');
</script>

<div class="home">
	<Logo size={200} />
	<h1 class="title">Illuminati</h1>
	<p class="subtitle">Guide the light. Drive away the dark.</p>
	<p class="author">Alberto Ferrero, April 2026</p>

	<form class="settings" onsubmit={(e) => e.preventDefault()}>
		<label class="field">
			<span>Theme</span>
			<select
				value={prefs.theme}
				onchange={(e) => { prefs.theme = e.currentTarget.value as 'light' | 'dark'; }}
			>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
			</select>
		</label>
		<label class="field">
			<span>Animations</span>
			<select
				value={prefs.animations ? 'on' : 'off'}
				onchange={(e) => { prefs.animations = e.currentTarget.value === 'on'; }}
			>
				<option value="on">On</option>
				<option value="off">Off</option>
			</select>
		</label>
	</form>

	<a href="/maps" class="start-btn">Enter</a>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		padding: 24px;
		gap: 16px;
		text-align: center;
	}
	.title {
		font-size: 2.6rem;
		font-weight: 300;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}
	.subtitle {
		font-size: 1.05rem;
		color: var(--color-muted);
		margin-bottom: 4px;
	}
	.author {
		font-size: 0.9rem;
		color: var(--color-muted);
		margin-bottom: 32px;
	}
	.settings {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		max-width: 240px;
	}
	.field {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
		color: var(--color-muted);
	}
	.field select {
		background: var(--color-surface);
		color: var(--color-fg);
		border: 2px solid var(--color-control-border);
		padding: 4px 8px;
		font: inherit;
	}
	.start-btn {
		display: inline-block;
		margin-top: 20px;
		padding: 12px 48px;
		border: 2px solid var(--color-control-border);
		font-size: 1rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transition: box-shadow 0.2s;
	}
	.start-btn:hover {
		box-shadow: var(--glow-soft);
	}
</style>
