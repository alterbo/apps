<script lang="ts">
	import { page } from '$app/state';
	import { getContext, onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import GameBoard from '$lib/components/game/GameBoard.svelte';
	import Controls from '$lib/components/game/Controls.svelte';
	import ScoreHUD from '$lib/components/game/ScoreHUD.svelte';
	import type { GameState } from '$lib/state/game.svelte.js';
	import type { PreferencesState } from '$lib/state/preferences.svelte.js';
	import { cityStreets } from '$lib/game/maps/city-streets.js';
	import { forest } from '$lib/game/maps/forest.js';
	import { industrial } from '$lib/game/maps/industrial.js';
	import type { MapData } from '$lib/game/maps/city-streets.js';

	const game = getContext<GameState>('game');
	const prefs = getContext<PreferencesState>('preferences');

	const mapLookup: Record<string, MapData> = {
		'city-streets': cityStreets,
		'forest': forest,
		'industrial': industrial,
	};

	onMount(() => {
		const mapId = page.params.mapId;
		if (!mapId || !mapLookup[mapId]) {
			goto('/maps');
			return;
		}
		if (game.mapData?.id === mapId) return;
		const data = mapLookup[mapId];
		game.loadMap(data);
		game.startIdleTimer();
	});

	onDestroy(() => {
		game.stopIdleTimer();
	});

	function handleMove(dir: 'n' | 'e' | 's' | 'w') {
		game.touch();
		game.moveBulb(dir);
	}
</script>

<div
	class="game-screen"
	data-idle={game.idle}
	data-no-anim={!prefs.animations}
>
	<header class="game-header">
		<a href="/maps" class="back">← Maps</a>
	</header>

	{#if game.mapData}
		<div class="board-wrap">
			<GameBoard {game} animate={prefs.animations} />
		</div>
		<ScoreHUD {game} />
		<Controls {game} onmove={handleMove} />
	{/if}
</div>

<style>
	.game-screen {
		position: relative;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
		background: var(--color-void);
	}
	.game-header {
		position: fixed;
		top: 12px;
		left: 12px;
		z-index: 10;
	}
	.back {
		font-size: 0.8rem;
		color: var(--color-muted);
		background: var(--color-control-bg);
		padding: 4px 10px;
		border: 2px solid var(--color-control-border);
	}
	.board-wrap {
		width: 100%;
		height: 100%;
	}
</style>
