<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import MapCard from '$lib/components/MapCard.svelte';
	import type { MapsState } from '$lib/state/maps.svelte.js';

	const mapsState = getContext<MapsState>('maps');
</script>

<div class="maps-screen">
	<header class="maps-header">
		<a href="/" class="back">← Back</a>
		<h1>Maps</h1>
	</header>

	<div class="maps-grid">
		{#each mapsState.maps as map (map.id)}
			<MapCard
				{map}
				onclick={() => goto(`/game/${map.id}`)}
			/>
		{/each}
	</div>
</div>

<style>
	.maps-screen {
		height: 100dvh;
		padding: 16px;
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
	.maps-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
	}
	.maps-header h1 {
		font-size: 1.6rem;
		font-weight: 300;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.back {
		font-size: 0.9rem;
		color: var(--color-muted);
	}
	.maps-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, 1fr);
		gap: 12px;
		flex: 1;
	}
	/* Make cards fill their grid cell on mobile */
	.maps-grid :global(.map-card) {
		height: 100%;
	}
	.maps-grid :global(.preview) {
		aspect-ratio: auto;
		flex: 1;
	}
	@media (min-width: 640px) {
		.maps-screen {
			height: auto;
			min-height: 100dvh;
			display: block;
			max-width: 900px;
		}
		.maps-header {
			margin-bottom: 24px;
		}
		.maps-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: auto;
			flex: none;
			gap: 16px;
		}
		.maps-grid :global(.map-card) {
			height: auto;
		}
		.maps-grid :global(.preview) {
			aspect-ratio: 1;
			flex: none;
		}
	}
</style>
