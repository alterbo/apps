<script lang="ts">
	import type { GameState } from '$lib/state/game.svelte.js';

	let { game, onmove }: {
		game: GameState;
		onmove: (dir: 'n' | 'e' | 's' | 'w') => void;
	} = $props();

	const dirs: { dir: 'n' | 'e' | 's' | 'w'; label: string; symbol: string }[] = [
		{ dir: 'n', label: 'North', symbol: '↑' },
		{ dir: 'e', label: 'East', symbol: '→' },
		{ dir: 's', label: 'South', symbol: '↓' },
		{ dir: 'w', label: 'West', symbol: '←' },
	];

	function handleKey(e: KeyboardEvent) {
		const map: Record<string, 'n' | 'e' | 's' | 'w'> = {
			ArrowUp: 'n', ArrowRight: 'e', ArrowDown: 's', ArrowLeft: 'w',
		};
		const dir = map[e.key];
		if (dir && game.canMove(dir)) {
			e.preventDefault();
			onmove(dir);
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="controls">
	{#each dirs as { dir, label, symbol }}
		{@const enabled = game.canMove(dir)}
		<button
			class="ctrl-btn {dir}"
			disabled={!enabled}
			aria-label="Move {label}"
			onclick={() => onmove(dir)}
		>
			<span class="arrow">{symbol}</span>
		</button>
	{/each}
</div>

<style>
	.controls {
		display: grid;
		grid-template-areas:
			". n ."
			"w . e"
			". s .";
		grid-template-columns: repeat(3, 48px);
		grid-template-rows: repeat(3, 48px);
		gap: 4px;
		position: fixed;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}
	.ctrl-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-control-bg);
		border: 2px solid var(--color-control-border);
		color: var(--color-fg);
		font-size: 1.2rem;
		transition: box-shadow 0.2s, border-color 0.2s, color 0.2s, background 0.2s;
	}
	.ctrl-btn:not(:disabled) {
		box-shadow: var(--glow-soft);
	}
	.ctrl-btn:not(:disabled):hover,
	.ctrl-btn:not(:disabled):focus-visible {
		outline: 2px solid var(--color-fg);
		outline-offset: 2px;
		box-shadow: var(--glow-strong);
	}
	.ctrl-btn:disabled {
		background: var(--color-control-disabled-bg);
		border-color: var(--color-control-border);
		color: var(--color-control-disabled-fg);
		opacity: 0.45;
		cursor: default;
	}
	.ctrl-btn:not(:disabled):active {
		box-shadow: var(--glow-strong);
	}
	.n { grid-area: n; }
	.e { grid-area: e; }
	.s { grid-area: s; }
	.w { grid-area: w; }
</style>
