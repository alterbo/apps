<script lang="ts">
	import { toIso, TILE_W, TILE_H } from '$lib/game/grid.js';
	import type { BuildingDef } from '$lib/game/maps/city-streets.js';

	let { building, lightIntensity = 0 }: { building: BuildingDef; lightIntensity?: number } = $props();

	let base = $derived(toIso(building.x, building.y));

	const tileW2 = TILE_W / 2;
	const tileH2 = TILE_H / 2;
	const bldgWidth = 0.88;

	let hueShift   = $derived(building.hueShift ?? 0);
	let fillFilter = $derived(hueShift !== 0 ? `hue-rotate(${hueShift}deg)` : 'none');
	let bh         = $derived(building.h * TILE_H * 0.8);
	let floors     = $derived(Math.max(1, building.h));

	let hw = $derived(tileW2 * bldgWidth);
	let hh = $derived(tileH2 * bldgWidth);

	let offsetSx = $derived(
		building.side === 'east'  ? -tileW2 * 0.12 :
		building.side === 'west'  ?  tileW2 * 0.12 : 0
	);
	let offsetSy = $derived(
		building.side === 'south' ?  tileH2 * 0.12 :
		building.side === 'north' ? -tileH2 * 0.12 : 0
	);

	let cx = $derived(base.sx + offsetSx);
	let cy = $derived(base.sy + offsetSy);

	// Bottom corners
	let botLeftX   = $derived(cx - hw); let botLeftY   = $derived(cy);
	let botRightX  = $derived(cx + hw); let botRightY  = $derived(cy);
	let botBottomX = $derived(cx);      let botBottomY = $derived(cy + hh);

	// Top corners
	let topLeftX   = $derived(cx - hw); let topLeftY   = $derived(cy - bh);
	let topRightX  = $derived(cx + hw); let topRightY  = $derived(cy - bh);
	let topTopX    = $derived(cx);      let topTopY    = $derived(cy - hh - bh);
	let topBottomX = $derived(cx);      let topBottomY = $derived(cy + hh - bh);

	// Face polygon strings
	let topFace   = $derived(`${topTopX},${topTopY} ${topRightX},${topRightY} ${topBottomX},${topBottomY} ${topLeftX},${topLeftY}`);
	let faceLeft  = $derived(`${topLeftX},${topLeftY} ${topBottomX},${topBottomY} ${botBottomX},${botBottomY} ${botLeftX},${botLeftY}`);
	let faceRight = $derived(`${topRightX},${topRightY} ${topBottomX},${topBottomY} ${botBottomX},${botBottomY} ${botRightX},${botRightY}`);

	// Left face basis vectors (for grating lines)
	let leftHorizX = $derived(botBottomX - botLeftX);
	let leftHorizY = $derived(botBottomY - botLeftY);
	let leftVertX  = $derived(topLeftX - botLeftX);
	let leftVertY  = $derived(topLeftY - botLeftY);

	// Right face basis vectors
	let rightHorizX = $derived(botBottomX - botRightX);
	let rightHorizY = $derived(botBottomY - botRightY);
	let rightVertX  = $derived(topRightX - botRightX);
	let rightVertY  = $derived(topRightY - botRightY);

	interface GratingLine { x1: number; y1: number; x2: number; y2: number }

	// Grating lines: 2× denser than floor lines for industrial texture
	let gratingLeft = $derived.by((): GratingLine[] => {
		const count = floors * 2;
		const lines: GratingLine[] = [];
		for (let i = 1; i < count; i++) {
			const frac = i / count;
			lines.push({
				x1: botLeftX + frac * leftVertX,
				y1: botLeftY + frac * leftVertY,
				x2: botLeftX + frac * leftVertX + leftHorizX,
				y2: botLeftY + frac * leftVertY + leftHorizY,
			});
		}
		return lines;
	});

	let gratingRight = $derived.by((): GratingLine[] => {
		const count = floors * 2;
		const lines: GratingLine[] = [];
		for (let i = 1; i < count; i++) {
			const frac = i / count;
			lines.push({
				x1: botRightX + frac * rightVertX,
				y1: botRightY + frac * rightVertY,
				x2: botRightX + frac * rightVertX + rightHorizX,
				y2: botRightY + frac * rightVertY + rightHorizY,
			});
		}
		return lines;
	});

	// Chimneys: two thin stubs on the top face, from topLeft toward topTop
	let chimneyH  = $derived(bh * 0.32);
	const chHalfW = 2.5; // screen px
	let ch1x = $derived(topLeftX + 0.30 * (topTopX - topLeftX));
	let ch1y = $derived(topLeftY + 0.30 * (topTopY - topLeftY));
	let ch2x = $derived(topLeftX + 0.65 * (topTopX - topLeftX));
	let ch2y = $derived(topLeftY + 0.65 * (topTopY - topLeftY));
</script>

<g class="factory" style:filter={fillFilter}>
	<!-- Right face -->
	<polygon
		points={faceRight}
		fill="var(--color-building-side-dark)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<!-- Left face -->
	<polygon
		points={faceLeft}
		fill="var(--color-building-fill)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<!-- Top face -->
	<polygon
		points={topFace}
		fill="var(--color-building-top)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>

	<!-- Industrial grating — left face -->
	{#each gratingLeft as line}
		<line
			x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
			stroke="var(--color-building-stroke)"
			stroke-width="0.4"
			opacity="0.5"
		/>
	{/each}

	<!-- Industrial grating — right face -->
	{#each gratingRight as line}
		<line
			x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
			stroke="var(--color-building-stroke)"
			stroke-width="0.3"
			opacity="0.3"
		/>
	{/each}

	<!-- Chimney 1 -->
	<rect
		x={ch1x - chHalfW} y={ch1y - chimneyH}
		width={chHalfW * 2} height={chimneyH}
		fill="var(--color-building-side-dark)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
	/>
	<line
		x1={ch1x - chHalfW - 1} y1={ch1y - chimneyH}
		x2={ch1x + chHalfW + 1} y2={ch1y - chimneyH}
		stroke="var(--color-building-stroke)"
		stroke-width="1"
		opacity="0.9"
	/>

	<!-- Chimney 2 -->
	<rect
		x={ch2x - chHalfW} y={ch2y - chimneyH}
		width={chHalfW * 2} height={chimneyH}
		fill="var(--color-building-side-dark)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
	/>
	<line
		x1={ch2x - chHalfW - 1} y1={ch2y - chimneyH}
		x2={ch2x + chHalfW + 1} y2={ch2y - chimneyH}
		stroke="var(--color-building-stroke)"
		stroke-width="1"
		opacity="0.9"
	/>
</g>
