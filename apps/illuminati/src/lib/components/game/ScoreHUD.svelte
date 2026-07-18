<script lang="ts">
	import type { GameState } from '$lib/state/game.svelte.js';

	let { game }: { game: GameState } = $props();
</script>

<div class="hud">
	<span class="stat">
		<span class="label">Found</span>
		<span class="value">{game.discovered}</span>
	</span>
</div>

<style>
	.hud {
		position: fixed;
		top: 12px;
		right: 12px;
		display: flex;
		gap: 16px;
		z-index: 10;
		font-size: 1rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--color-control-bg);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 8px 16px;
	}
	.label {
		color: var(--color-muted);
		font-size: 0.75rem;
	}
	.value {
		font-size: 1.8rem;
		font-weight: 600;
	}
</style>
