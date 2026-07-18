<script lang="ts">
	import { toIso, TILE_W, TILE_H } from '$lib/game/grid.js';
	import type { BuildingDef } from '$lib/game/maps/city-streets.js';

	let { building, lightIntensity = 0 }: { building: BuildingDef; lightIntensity?: number } = $props();

	let base = $derived(toIso(building.x, building.y));

	// Isometric building dimensions
	let tileW2 = TILE_W / 2; // 32
	let tileH2 = TILE_H / 2; // 16
	let bldgWidth = 0.88;
	let bh = $derived(building.h * TILE_H * 0.8);

	// Defaults for optional fields
	let windowCols = $derived(building.windowCols ?? 2);
	let hasBalconies = $derived(building.hasBalconies ?? false);
	let floors = $derived(Math.max(1, building.h));
	let hueShift = $derived(building.hueShift ?? 0);

	// Half-widths for the building footprint
	let hw = $derived(tileW2 * bldgWidth);
	let hh = $derived(tileH2 * bldgWidth);

	// Street-edge offset
	let offsetSx = $derived(
		building.side === 'east'  ? -tileW2 * 0.12 :
		building.side === 'west'  ?  tileW2 * 0.12 :
		0
	);
	let offsetSy = $derived(
		building.side === 'south' ?  tileH2 * 0.12 :
		building.side === 'north' ? -tileH2 * 0.12 :
		0
	);

	let cx = $derived(base.sx + offsetSx);
	let cy = $derived(base.sy + offsetSy);

	// 4 bottom corners of the iso diamond footprint
	let botTopX = $derived(cx); let botTopY = $derived(cy - hh);
	let botRightX = $derived(cx + hw); let botRightY = $derived(cy);
	let botBottomX = $derived(cx); let botBottomY = $derived(cy + hh);
	let botLeftX = $derived(cx - hw); let botLeftY = $derived(cy);

	// 4 top corners (shifted up by bh)
	let topTopX = $derived(cx); let topTopY = $derived(cy - hh - bh);
	let topRightX = $derived(cx + hw); let topRightY = $derived(cy - bh);
	let topBottomX = $derived(cx); let topBottomY = $derived(cy + hh - bh);
	let topLeftX = $derived(cx - hw); let topLeftY = $derived(cy - bh);

	// Face polygon strings
	let topFace = $derived(`${topTopX},${topTopY} ${topRightX},${topRightY} ${topBottomX},${topBottomY} ${topLeftX},${topLeftY}`);
	let faceLeft = $derived(`${topLeftX},${topLeftY} ${topBottomX},${topBottomY} ${botBottomX},${botBottomY} ${botLeftX},${botLeftY}`);
	let faceRight = $derived(`${topRightX},${topRightY} ${topBottomX},${topBottomY} ${botBottomX},${botBottomY} ${botRightX},${botRightY}`);

	// ---- Isometric face vectors for projecting windows ----
	// Left face: from botLeft to botBottom (horizontal axis) and from botLeft to topLeft (vertical axis)
	let leftHorizX = $derived(botBottomX - botLeftX); // hw
	let leftHorizY = $derived(botBottomY - botLeftY); // hh
	let leftVertX = $derived(topLeftX - botLeftX); // 0
	let leftVertY = $derived(topLeftY - botLeftY); // -bh

	// Right face: from botRight to botBottom (horizontal axis) and from botRight to topRight (vertical axis)
	let rightHorizX = $derived(botBottomX - botRightX); // -hw
	let rightHorizY = $derived(botBottomY - botRightY); // hh
	let rightVertX = $derived(topRightX - botRightX); // 0
	let rightVertY = $derived(topRightY - botRightY); // -bh

	// Window glow: warm color when near the light source
	let windowGlow = $derived(lightIntensity > 0 ? `hsl(${40 + hueShift}, ${30 + lightIntensity * 30}%, ${50 + lightIntensity * 30}%)` : 'none');
	let windowGlowOpacity = $derived(lightIntensity > 0 ? 0.3 + lightIntensity * 0.5 : 0);

	// Color variation via hue filter
	let fillFilter = $derived(hueShift !== 0 ? `hue-rotate(${hueShift}deg)` : 'none');

	// Generate isometric window parallelograms on a face
	// originX/Y = bottom-left corner of the face
	// hx/hy = horizontal vector of the face
	// vx/vy = vertical vector of the face (goes up)
	function faceWindows(
		originX: number, originY: number,
		hx: number, hy: number,
		vx: number, vy: number,
		cols: number, floorCount: number
	): { points: string; cx: number; cy: number; floor: number }[] {
		const wins: { points: string; cx: number; cy: number; floor: number }[] = [];
		const winW = 0.12; // fraction of face width per window
		const winH = 0.5; // fraction of floor height per window
		const margin = 0.15; // margin from face edges

		for (let f = 0; f < floorCount; f++) {
			const floorFrac = (f + 0.35) / floorCount; // vertical position (0 = bottom, 1 = top)
			for (let c = 0; c < cols; c++) {
				const colFrac = margin + (c + 0.5) * (1 - 2 * margin) / cols;

				// Center of window in face-local coordinates
				const wcx = originX + colFrac * hx + floorFrac * vx;
				const wcy = originY + colFrac * hy + floorFrac * vy;

				// Window corners (parallelogram aligned to face)
				const whx = hx * winW * 0.5;
				const why = hy * winW * 0.5;
				const wvx = vx * (winH / floorCount) * 0.5;
				const wvy = vy * (winH / floorCount) * 0.5;

				const p1 = `${wcx - whx - wvx},${wcy - why - wvy}`;
				const p2 = `${wcx + whx - wvx},${wcy + why - wvy}`;
				const p3 = `${wcx + whx + wvx},${wcy + why + wvy}`;
				const p4 = `${wcx - whx + wvx},${wcy - why + wvy}`;

				wins.push({ points: `${p1} ${p2} ${p3} ${p4}`, cx: wcx, cy: wcy, floor: f });
			}
		}
		return wins;
	}

	// Generate floor separation lines on a face
	function floorLines(
		originX: number, originY: number,
		hx: number, hy: number,
		vx: number, vy: number,
		floorCount: number
	): { x1: number; y1: number; x2: number; y2: number }[] {
		const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
		for (let f = 1; f < floorCount; f++) {
			const frac = f / floorCount;
			const x1 = originX + frac * vx;
			const y1 = originY + frac * vy;
			const x2 = x1 + hx;
			const y2 = y1 + hy;
			lines.push({ x1, y1, x2, y2 });
		}
		return lines;
	}

	// Balcony ledges: small protruding shelves on the left face
	function balconyLedges(
		originX: number, originY: number,
		hx: number, hy: number,
		vx: number, vy: number,
		floorCount: number
	): { points: string }[] {
		if (!hasBalconies || floorCount < 2) return [];
		const ledges: { points: string }[] = [];
		const ledgeDepth = 3; // pixels protruding outward

		for (let f = 1; f < floorCount; f += 2) {
			const frac = f / floorCount;
			// Ledge sits at the bottom of each odd floor
			const lx = originX + frac * vx;
			const ly = originY + frac * vy;
			const rx = lx + hx;
			const ry = ly + hy;

			// Protrude outward (perpendicular to the face, roughly downward-left for left face)
			const px = lx + 0;
			const py = ly + ledgeDepth;
			const prx = rx + 0;
			const pry = ry + ledgeDepth;

			ledges.push({
				points: `${lx},${ly} ${rx},${ry} ${prx},${pry} ${px},${py}`
			});
		}
		return ledges;
	}

	// Computed window/floor/balcony data
	let leftWindows = $derived(faceWindows(botLeftX, botLeftY, leftHorizX, leftHorizY, leftVertX, leftVertY, windowCols, floors));
	let rightWindows = $derived(faceWindows(botRightX, botRightY, rightHorizX, rightHorizY, rightVertX, rightVertY, Math.max(1, windowCols - 1), floors));
	let leftFloorLines = $derived(floorLines(botLeftX, botLeftY, leftHorizX, leftHorizY, leftVertX, leftVertY, floors));
	let rightFloorLines = $derived(floorLines(botRightX, botRightY, rightHorizX, rightHorizY, rightVertX, rightVertY, floors));
	let leftBalconies = $derived(balconyLedges(botLeftX, botLeftY, leftHorizX, leftHorizY, leftVertX, leftVertY, floors));

	// Door parallelogram on left face ground floor
	let doorPoints = $derived(() => {
		const colFrac = 0.5;
		const doorH = 0.7;
		const doorW = 0.14;

		const dcx = botLeftX + colFrac * leftHorizX + (doorH / floors * 0.5) * leftVertX;
		const dcy = botLeftY + colFrac * leftHorizY + (doorH / floors * 0.5) * leftVertY;

		const dhx = leftHorizX * doorW * 0.5;
		const dhy = leftHorizY * doorW * 0.5;
		const dvx = leftVertX * (doorH / floors) * 0.5;
		const dvy = leftVertY * (doorH / floors) * 0.5;

		return `${dcx - dhx - dvx},${dcy - dhy - dvy} ${dcx + dhx - dvx},${dcy + dhy - dvy} ${dcx + dhx + dvx},${dcy + dhy + dvy} ${dcx - dhx + dvx},${dcy - dhy + dvy}`;
	});
</script>

<g class="building" style:filter={fillFilter}>
	<!-- right face (darker side) -->
	<polygon
		points={faceRight}
		fill="var(--color-building-side-dark)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<!-- left face (main front) -->
	<polygon
		points={faceLeft}
		fill="var(--color-building-fill)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>
	<!-- top face (lightest) -->
	<polygon
		points={topFace}
		fill="var(--color-building-top)"
		stroke="var(--color-building-stroke)"
		stroke-width="0.5"
		stroke-linejoin="round"
	/>

	<!-- floor separation lines on left face -->
	{#each leftFloorLines as line}
		<line
			x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
			stroke="var(--color-building-stroke)"
			stroke-width="0.3"
			opacity="0.4"
		/>
	{/each}

	<!-- floor separation lines on right face -->
	{#each rightFloorLines as line}
		<line
			x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
			stroke="var(--color-building-stroke)"
			stroke-width="0.3"
			opacity="0.3"
		/>
	{/each}

	<!-- balcony ledges on left face -->
	{#each leftBalconies as ledge}
		<polygon
			points={ledge.points}
			fill="var(--color-building-fill)"
			stroke="var(--color-building-stroke)"
			stroke-width="0.3"
			opacity="0.8"
		/>
	{/each}

	<!-- windows on left face (isometric parallelograms) -->
	{#each leftWindows as win}
		<polygon
			points={win.points}
			fill={windowGlow}
			fill-opacity={windowGlowOpacity}
			stroke="var(--color-building-stroke)"
			stroke-width="0.35"
			opacity="0.7"
		/>
	{/each}

	<!-- windows on right face (isometric parallelograms) -->
	{#each rightWindows as win}
		<polygon
			points={win.points}
			fill={windowGlow}
			fill-opacity={windowGlowOpacity * 0.6}
			stroke="var(--color-building-stroke)"
			stroke-width="0.3"
			opacity="0.5"
		/>
	{/each}

	<!-- door on left face (ground floor) -->
	<polygon
		points={doorPoints()}
		fill="none"
		stroke="var(--color-building-stroke)"
		stroke-width="0.4"
		opacity="0.7"
	/>
</g>
