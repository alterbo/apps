<script lang="ts">
	import { toIso, TILE_W, TILE_H } from '$lib/game/grid.js';
	import type { BuildingDef } from '$lib/game/maps/city-streets.js';

	let { building, lightIntensity = 0 }: { building: BuildingDef; lightIntensity?: number } = $props();

	const tileW2 = TILE_W / 2; // 32
	const tileH2 = TILE_H / 2; // 16

	let base      = $derived(toIso(building.x, building.y));
	let hueShift  = $derived(building.hueShift ?? 0);
	let fillFilter = $derived(hueShift !== 0 ? `hue-rotate(${hueShift}deg)` : 'none');
	let totalH    = $derived(building.h * TILE_H * 0.8);

	let cx = $derived(base.sx);
	let cy = $derived(base.sy);

	// Trunk: thin line from tile center up
	let trunkH    = $derived(totalH * 0.28);
	let trunkTopY = $derived(cy - trunkH);

	// Three stacked iso-diamond tiers — classic isometric pine
	// Tier 1 — bottom, widest
	let t1Y  = $derived(cy - trunkH);
	const t1hw = tileW2 * 0.68;
	const t1hh = tileH2 * 0.68;

	// Tier 2 — middle
	let t2Y  = $derived(t1Y - totalH * 0.26);
	const t2hw = tileW2 * 0.48;
	const t2hh = tileH2 * 0.48;

	// Tier 3 — apex
	let t3Y  = $derived(t2Y - totalH * 0.20);
	const t3hw = tileW2 * 0.28;
	const t3hh = tileH2 * 0.28;

	// ISO diamond: top, right, bottom, left corners
	let tier1 = $derived(`${cx},${t1Y - t1hh} ${cx + t1hw},${t1Y} ${cx},${t1Y + t1hh} ${cx - t1hw},${t1Y}`);
	let tier2 = $derived(`${cx},${t2Y - t2hh} ${cx + t2hw},${t2Y} ${cx},${t2Y + t2hh} ${cx - t2hw},${t2Y}`);
	let tier3 = $derived(`${cx},${t3Y - t3hh} ${cx + t3hw},${t3Y} ${cx},${t3Y + t3hh} ${cx - t3hw},${t3Y}`);

	// Subtle glow when lit
	let litBoost = $derived(lightIntensity * 0.15);
</script>

<g class="tree" style:filter={fillFilter}>
	<!-- Trunk -->
	<line
		x1={cx} y1={cy}
		x2={cx} y2={trunkTopY}
		stroke="var(--color-building-side-dark)"
		stroke-width="2.5"
		opacity="0.65"
	/>
	<!-- Tier 1 — bottom canopy (slightly darker read as shadow underneath) -->
	<polygon
		points={tier1}
		fill="var(--glow-color)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
		opacity={0.62 + litBoost}
	/>
	<!-- Tier 2 — mid canopy -->
	<polygon
		points={tier2}
		fill="var(--glow-color)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
		opacity={0.78 + litBoost}
	/>
	<!-- Tier 3 — apex -->
	<polygon
		points={tier3}
		fill="var(--glow-color)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.4"
		stroke-linejoin="round"
		opacity={0.92 + litBoost}
	/>
</g>
