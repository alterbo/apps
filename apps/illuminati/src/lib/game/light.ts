import type { Pos } from '$lib/game/grid.js';

/** Returns set of "x,y" keys within isometric Manhattan distance. */
export function getSectorsInRange(
	center: Pos,
	range: number,
	mapW: number,
	mapH: number,
): Set<string> {
	const result = new Set<string>();
	for (let dy = -range; dy <= range; dy++) {
		for (let dx = -range; dx <= range; dx++) {
			if (Math.abs(dx) + Math.abs(dy) > range) continue;
			const x = center.x + dx;
			const y = center.y + dy;
			if (x >= 0 && y >= 0 && x < mapW && y < mapH) {
				result.add(`${x},${y}`);
			}
		}
	}
	return result;
}

/** Returns 0-1 intensity (1 = center, 0 = outside range). */
export function getLightIntensity(pos: Pos, bulb: Pos, range: number): number {
	const dist = Math.abs(pos.x - bulb.x) + Math.abs(pos.y - bulb.y);
	if (dist > range) return 0;
	return 1 - dist / (range + 1);
}
