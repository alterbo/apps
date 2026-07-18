export interface Pos { x: number; y: number; }

/** Tile width/height for isometric projection (2:1 ratio). */
export const TILE_W = 64;
export const TILE_H = 32;

/** Convert grid (x, y) to isometric screen coordinates (center of tile). */
export function toIso(x: number, y: number): { sx: number; sy: number } {
	return {
		sx: (x - y) * (TILE_W / 2),
		sy: (x + y) * (TILE_H / 2),
	};
}

/** Convert screen coords back to grid coords (approximate). */
export function fromIso(sx: number, sy: number): { x: number; y: number } {
	return {
		x: Math.round((sx / (TILE_W / 2) + sy / (TILE_H / 2)) / 2),
		y: Math.round((sy / (TILE_H / 2) - sx / (TILE_W / 2)) / 2),
	};
}

/** Get the 4 corner points of an isometric diamond tile. */
export function tileDiamond(x: number, y: number): string {
	const { sx, sy } = toIso(x, y);
	const hw = TILE_W / 2;
	const hh = TILE_H / 2;
	return `${sx},${sy - hh} ${sx + hw},${sy} ${sx},${sy + hh} ${sx - hw},${sy}`;
}

export function isInBounds(x: number, y: number, w: number, h: number): boolean {
	return x >= 0 && y >= 0 && x < w && y < h;
}
