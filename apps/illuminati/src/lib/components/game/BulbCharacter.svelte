<script lang="ts">
	import { toIso, TILE_W, TILE_H } from '$lib/game/grid.js';

	let { x, y, animate = true }: { x: number; y: number; animate?: boolean } = $props();

	let pos = $derived(toIso(x, y));

	// Subtle landing flash when the pyramid arrives at a new sector
	let landing = $state(false);
	let moving = $state(false);
	let _isMount = true;
	let _landTimer: ReturnType<typeof setTimeout> | undefined;
	let _moveTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		const _ = `${x},${y}`; // track position changes
		if (_isMount) { _isMount = false; return; }
		clearTimeout(_landTimer);
		clearTimeout(_moveTimer);
		landing = false;
		moving = true;
		requestAnimationFrame(() => {
			landing = true;
			_landTimer = setTimeout(() => { landing = false; }, 220);
		});
		_moveTimer = setTimeout(() => { moving = false; }, 320);
		return () => { clearTimeout(_landTimer); clearTimeout(_moveTimer); };
	});

	// Each ray: angle (degrees), inner radius, outer radius
	const rays: [number, number, number][] = [
		[0, 12, 20],    [15, 10, 15],   [30, 12, 22],
		[45, 10, 16],   [60, 12, 19],   [75, 10, 14],
		[90, 13, 23],   [105, 10, 15],  [120, 12, 20],
		[135, 10, 16],  [150, 12, 18],  [165, 10, 14],
		[180, 12, 21],  [195, 10, 15],  [210, 12, 19],
		[225, 10, 16],  [240, 12, 22],  [255, 10, 14],
		[270, 13, 24],  [285, 10, 15],  [300, 12, 20],
		[315, 10, 16],  [330, 12, 18],  [345, 10, 14],
	];
</script>

<g
	class="pyramid"
	class:animate
	class:landing={landing && animate}
	class:moving={moving && animate}
	style:transform="translate({pos.sx}px, {pos.sy}px)"
>
	<!-- radiating shine lines (behind pyramid) -->
	{#each rays as [angle, r1, r2], i}
		{@const rad = angle * Math.PI / 180}
		{@const x1 = Math.cos(rad) * r1}
		{@const y1 = Math.sin(rad) * r1 - 4}
		{@const x2 = Math.cos(rad) * r2}
		{@const y2 = Math.sin(rad) * r2 - 4}
		<line
			{x1} {y1} {x2} {y2}
			stroke="var(--glow-color)"
			stroke-width={i % 3 === 0 ? 0.5 : 0.3}
			stroke-linecap="round"
			opacity={i % 3 === 0 ? 0.4 : 0.2}
			class="ray"
			style:animation-delay="{i * 0.12}s"
		/>
	{/each}

	<!-- soft glow disc -->
	<circle cx="0" cy="-4" r="10" fill="var(--glow-color)" opacity="0.06" class="glow" />

	<!-- outer triangle -->
	<polygon
		points="0,-16 12,6 -12,6"
		fill="none"
		stroke="var(--color-fg)"
		stroke-width="0.8"
		stroke-linejoin="round"
	/>

	<!-- inner triangle -->
	<polygon
		points="0,-10 7,2 -7,2"
		fill="none"
		stroke="var(--color-muted)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>

	<!-- eye / light core -->
	<ellipse cx="0" cy="-3" rx="2" ry="2.5"
		fill="var(--glow-color)" opacity="0.7" class="eye" />
	<ellipse cx="0" cy="-3" rx="0.8" ry="1"
		fill="var(--color-fg)" opacity="0.9" />

	<!-- base shadow on ground (isometric ellipse) -->
	<ellipse cx="0" cy="8" rx="8" ry="3"
		fill="var(--glow-color)" opacity="0.05" />
</g>

<style>
	.pyramid.animate {
		transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	@keyframes land {
		0%   { opacity: 0.55; filter: brightness(1.4); }
		100% { opacity: 1;    filter: brightness(1); }
	}

	.pyramid.landing {
		animation: land 0.22s ease-out forwards;
	}

	.pyramid .eye {
		animation: eye-pulse 3s ease-in-out infinite alternate;
	}

	.pyramid .glow {
		opacity: 0.06;
		transition: opacity 0.15s ease;
		animation: glow-breathe 4s ease-in-out infinite alternate;
	}

	.pyramid.moving .glow {
		opacity: 0.28;
		animation: none;
	}

	.pyramid .ray {
		animation: ray-shimmer 3s ease-in-out infinite alternate;
	}

	@keyframes eye-pulse {
		0% { opacity: 0.5; }
		100% { opacity: 0.8; }
	}

	@keyframes glow-breathe {
		0% { opacity: 0.04; }
		100% { opacity: 0.09; }
	}

	@keyframes ray-shimmer {
		0% { opacity: 0.15; }
		100% { opacity: 0.45; }
	}
</style>
