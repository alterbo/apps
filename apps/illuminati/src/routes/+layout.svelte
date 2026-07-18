<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/tokens.css';
	import '$lib/styles/global.css';
	import { setContext } from 'svelte';
	import { createPreferences } from '$lib/state/preferences.svelte.js';
	import { createMapsState } from '$lib/state/maps.svelte.js';
	import { createGameState } from '$lib/state/game.svelte.js';

	let { children } = $props();

	const preferences = createPreferences();
	const maps = createMapsState();
	const game = createGameState();

	setContext('preferences', preferences);
	setContext('maps', maps);
	setContext('game', game);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Illuminati | Alberto Ferrero</title>
</svelte:head>

<div data-theme={preferences.theme}>
	{@render children()}
</div>

<style>
	div {
		min-height: 100dvh;
	}
</style>
