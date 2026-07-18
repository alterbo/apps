<script lang="ts">
	import { toIso } from '$lib/game/grid.js';
	import type { Hand } from '$lib/state/game.svelte.js';

	let { hand, animate = true, oncomplete }: {
		hand: Hand;
		animate?: boolean;
		oncomplete?: (id: number) => void;
	} = $props();

	function toRoman(n: number): string {
		const vals = [9, 8, 5, 4, 1] as const;
		const syms = ['IX', 'VIII', 'V', 'IV', 'I'] as const;
		let result = '';
		let rem = n;
		for (let i = 0; i < vals.length; i++) {
			while (rem >= vals[i]) { result += syms[i]; rem -= vals[i]; }
		}
		return result;
	}

	let pos = $derived(
		hand.state === 'fleeing' && hand.fleeTarget
			? toIso(hand.fleeTarget.x, hand.fleeTarget.y)
			: toIso(hand.x, hand.y)
	);

	let visible = $derived(hand.state !== 'gone');

	function onTransitionEnd() {
		if (hand.state === 'fleeing') {
			oncomplete?.(hand.id);
		}
	}
</script>

{#if visible}
<g
	class="enemy-pyramid"
	class:animate
	class:fleeing={hand.state === 'fleeing'}
	style:transform="translate({pos.sx}px, {pos.sy}px)"
	ontransitionend={onTransitionEnd}
>
	<!-- outer triangle — same orientation as bulb: base at bottom, apex at top -->
	<polygon
		points="0,-8 -8,6 8,6"
		fill="none"
		stroke="var(--color-hand)"
		stroke-width="0.7"
		stroke-linejoin="round"
	/>

	<!-- roman numeral index (centroid of triangle is near y=1.3) -->
	<text
		x="0" y="2"
		text-anchor="middle"
		dominant-baseline="central"
		font-size="4"
		font-family="serif"
		fill="var(--color-hand)"
		opacity="0.9"
		stroke="none"
	>{toRoman(hand.id + 1)}</text>
</g>
{/if}

<style>
	.enemy-pyramid.animate {
		transition: transform 1.2s ease-in, opacity 1.2s ease-in;
	}
	.enemy-pyramid.fleeing {
		opacity: 0;
		/* delay opacity fade so character is visible while fleeing */
		transition: transform 1.2s ease-in, opacity 0.6s ease-in 0.6s;
	}
</style>
