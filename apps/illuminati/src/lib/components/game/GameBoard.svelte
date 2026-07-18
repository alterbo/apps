<script lang="ts">
	import { onMount } from 'svelte';
	import { toIso, tileDiamond, TILE_W, TILE_H } from '$lib/game/grid.js';
	import type { GameState } from '$lib/state/game.svelte.js';
	import type { BuildingDef } from '$lib/game/maps/city-streets.js';
	import BulbCharacter from './BulbCharacter.svelte';
	import HandEnemy from './HandEnemy.svelte';
	import Building from './Building.svelte';
	import Tree from './Tree.svelte';
	import Factory from './Factory.svelte';

	let { game, animate = true }: { game: GameState; animate?: boolean } = $props();

	let mapData = $derived(game.mapData);
	let litSectors = $derived(game.litSectors);

	interface RenderEntity {
		kind: 'building' | 'bulb' | 'hand';
		depth: number;
		data: any;
	}

	// Responsive viewBox — zoom out on large screens so strokes stay thin
	let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 768);
	onMount(() => {
		function onResize() { innerWidth = window.innerWidth; }
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	let vbW = $derived(innerWidth >= 1024 ? 360 : 220);
	let vbH = $derived(innerWidth >= 1024 ? 290 : 180);

	// Viewbox centers on bulb — smaller viewBox = closer zoom
	let bulbIso = $derived(toIso(game.bulb.x, game.bulb.y));
	let vbX = $derived(bulbIso.sx - vbW / 2);
	let vbY = $derived(bulbIso.sy - vbH / 2);

	// Buildings sorted once per map load (depth = x + y, ascending = farther from camera)
	let sortedBuildings = $derived.by(() => {
		if (!mapData) return [] as RenderEntity[];
		return mapData.buildings
			.map(b => ({ kind: 'building' as const, depth: b.x + b.y, data: b }))
			.sort((a, b) => a.depth - b.depth);
	});

	// Merge pre-sorted buildings with small dynamic set (bulb + ≤7 hands) via O(n+m) merge
	let sortedEntities = $derived.by(() => {
		if (!mapData) return [] as RenderEntity[];

		const bulbEntity: RenderEntity = { kind: 'bulb', depth: game.bulb.x + game.bulb.y, data: game.bulb };
		const dynamics: RenderEntity[] = [bulbEntity];
		for (const h of game.hands) {
			if (h.state !== 'gone') dynamics.push({ kind: 'hand', depth: h.x + h.y, data: h });
		}
		dynamics.sort((a, b) => a.depth - b.depth);

		// Merge two sorted arrays
		const result: RenderEntity[] = [];
		let bi = 0, di = 0;
		while (bi < sortedBuildings.length && di < dynamics.length) {
			if (sortedBuildings[bi].depth <= dynamics[di].depth) result.push(sortedBuildings[bi++]);
			else result.push(dynamics[di++]);
		}
		while (bi < sortedBuildings.length) result.push(sortedBuildings[bi++]);
		while (di < dynamics.length) result.push(dynamics[di++]);
		return result;
	});

	function sectorOpacity(x: number, y: number): number {
		const intensity = game.getLightIntensity(x, y);
		return intensity > 0 ? 0.3 + intensity * 0.7 : 0.08;
	}

	function buildingLightIntensity(b: BuildingDef): number {
		return game.getLightIntensity(b.x, b.y);
	}

	// Light ring config
	let lightRange = $derived(game.lightRange);
	const ringColors = [
		'hsl(45, 40%, 75%)',
		'hsl(45, 30%, 65%)',
		'hsl(45, 20%, 55%)',
		'hsl(40, 15%, 45%)',
	];

	// Generate isometric diamond ring path (ground-plane projected)
	function isoRingPath(cx: number, cy: number, dist: number): string {
		const rx = dist * TILE_W * 0.48;
		const ry = dist * TILE_H * 0.48;
		// Diamond with slightly rounded corners using cubic bezier
		const curve = 0.42; // 0 = sharp diamond, 0.55 = ellipse
		const top = { x: cx, y: cy - ry };
		const right = { x: cx + rx, y: cy };
		const bottom = { x: cx, y: cy + ry };
		const left = { x: cx - rx, y: cy };

		return `M ${top.x} ${top.y}
			C ${top.x + rx * curve} ${top.y + ry * curve * 0.3}
			  ${right.x - rx * curve * 0.3} ${right.y - ry * curve}
			  ${right.x} ${right.y}
			C ${right.x - rx * curve * 0.3} ${right.y + ry * curve}
			  ${bottom.x + rx * curve} ${bottom.y - ry * curve * 0.3}
			  ${bottom.x} ${bottom.y}
			C ${bottom.x - rx * curve} ${bottom.y - ry * curve * 0.3}
			  ${left.x + rx * curve * 0.3} ${left.y + ry * curve}
			  ${left.x} ${left.y}
			C ${left.x + rx * curve * 0.3} ${left.y - ry * curve}
			  ${top.x - rx * curve} ${top.y + ry * curve * 0.3}
			  ${top.x} ${top.y}Z`;
	}
</script>

{#if mapData}
<svg
	class="game-board"
	viewBox="{vbX} {vbY} {vbW} {vbH}"
	preserveAspectRatio="xMidYMid meet"
>
	<!-- grid tiles -->
	<g class="grid">
	{#each mapData.grid as row, y}
		{#each row as sector, x}
			{#if sector !== 'empty' && sector !== 'building'}
				<polygon
					points={tileDiamond(x, y)}
					fill={litSectors.has(`${x},${y}`) ? 'var(--color-light-center)' : 'transparent'}
					stroke="var(--color-grid)"
					stroke-width="0.5"
					opacity={sectorOpacity(x, y)}
				/>
			{/if}
		{/each}
	{/each}
	</g>

	<!-- isometric diamond light rings -->
	{#each Array(lightRange) as _, i}
		{@const dist = i + 1}
		<path
			d={isoRingPath(bulbIso.sx, bulbIso.sy, dist)}
			fill="none"
			stroke={ringColors[Math.min(i, ringColors.length - 1)]}
			stroke-width={i === 0 ? 0.7 : 0.5}
			stroke-dasharray={i === 0 ? '3 4' : '2 5'}
			opacity={0.5 - i * 0.12}
			class="light-ring"
		/>
	{/each}

	<!-- depth-sorted entities -->
	{#each sortedEntities as entity (entity.kind + '-' + (entity.data.id ?? entity.data.x + ',' + entity.data.y))}
		{#if entity.kind === 'building'}
			{@const b = entity.data as BuildingDef}
			{@const li = buildingLightIntensity(b)}
			{#if b.kind === 'tree'}
				<Tree building={b} lightIntensity={li} />
			{:else if b.kind === 'factory'}
				<Factory building={b} lightIntensity={li} />
			{:else}
				<Building building={b} lightIntensity={li} />
			{/if}
		{:else if entity.kind === 'bulb'}
			<BulbCharacter x={game.bulb.x} y={game.bulb.y} {animate} />
		{:else if entity.kind === 'hand'}
			<HandEnemy
				hand={entity.data}
				{animate}
				oncomplete={(id) => game.completeHandFlee(id)}
			/>
		{/if}
	{/each}
</svg>
{/if}

<style>
	.game-board {
		width: 100%;
		height: 100%;
		display: block;
		background: var(--color-void);
	}

	.light-ring {
		pointer-events: none;
	}
</style>
