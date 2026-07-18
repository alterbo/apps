/**
 * City Streets — first map.
 *
 * Grid legend:
 *   '.'  = empty
 *   'h'  = street horizontal
 *   'd'  = street diagonal (rendered at iso angle)
 *   'B'  = building
 */

export type SectorType = 'empty' | 'street-h' | 'street-d' | 'building';

export interface BuildingDef {
	x: number;
	y: number;
	/** Height in sectors (visual only). */
	h: number;
	/** Which side of street the facade faces. */
	side: 'south' | 'north' | 'east' | 'west';
	/** Number of window columns per face (default: 2). */
	windowCols?: number;
	/** Whether this building has balconies on some floors (default: false). */
	hasBalconies?: boolean;
	/** Facade style affecting detail density (default: 'plain'). */
	facadeStyle?: 'plain' | 'ornate' | 'modern';
	/** Hue shift in degrees for subtle color variation (default: 0). */
	hueShift?: number;
	/** Whether this is a decorative backdrop building outside the grid (default: false). */
	backdrop?: boolean;
	/** Visual kind — controls which renderer is used (default: 'building'). */
	kind?: 'building' | 'tree' | 'factory';
}

export interface MapData {
	id: string;
	name: string;
	width: number;
	height: number;
	grid: SectorType[][];
	buildings: BuildingDef[];
	hands: { x: number; y: number }[];
	start: { x: number; y: number };
}

const RAW = [
	//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
	'. . . B B . . . . . . . . . B B . . . .'.split(' '), // 0
	'. . . B B . . . . . . . . . B B . . . .'.split(' '), // 1
	'. . . h h h h h h h h h h h h h . . . .'.split(' '), // 2
	'. . . h . . . h . . . h . . h . . . . .'.split(' '), // 3
	'. . . h . . . h . . . h . . h . . . . .'.split(' '), // 4
	'B B h h h h h h . . . h h h h h h B B .'.split(' '), // 5
	'. . . h . . . . . . . . . . h . . . . .'.split(' '), // 6
	'. . . h . . . . . . . . . . h . . . . .'.split(' '), // 7
	'. . . h . . . B B . . . . . h . . . . .'.split(' '), // 8
	'. . . h . . . B B . . . . . h . . . . .'.split(' '), // 9
	'B B h h h h h h h h h h h h h h h B B .'.split(' '), // 10
	'. . . h . . . . . . . h . . h . . . . .'.split(' '), // 11
	'. . . h . . . . . . . h . . h . . . . .'.split(' '), // 12
	'. . . h h h h h h h h h . . h h h . . .'.split(' '), // 13
	'. . . . . . . . . . . . . . . B B . . .'.split(' '), // 14
	'. . . . . . . . . . . . . . . B B . . .'.split(' '), // 15
];

function parseChar(c: string): SectorType {
	switch (c) {
		case 'h': return 'street-h';
		case 'd': return 'street-d';
		case 'B': return 'building';
		default: return 'empty';
	}
}

const grid: SectorType[][] = RAW.map(row => row.map(parseChar));

export const cityStreets: MapData = {
	id: 'city-streets',
	name: 'City Streets',
	width: 20,
	height: 16,
	grid,
	buildings: [
		// === Row 0-1 top buildings (south-facing) ===
		{ x: 3, y: 0, h: 4, side: 'south', windowCols: 3, hasBalconies: true, facadeStyle: 'ornate', hueShift: 5 },
		{ x: 4, y: 0, h: 3, side: 'south', windowCols: 2, facadeStyle: 'modern', hueShift: -5 },
		{ x: 3, y: 1, h: 3, side: 'south', windowCols: 2, hueShift: 10 },
		{ x: 4, y: 1, h: 2, side: 'south', windowCols: 2, hueShift: -3 },
		{ x: 14, y: 0, h: 5, side: 'south', windowCols: 3, hasBalconies: true, facadeStyle: 'ornate', hueShift: -8 },
		{ x: 15, y: 0, h: 4, side: 'south', windowCols: 2, facadeStyle: 'modern', hueShift: 3 },
		{ x: 14, y: 1, h: 3, side: 'south', windowCols: 2, hueShift: 7 },
		{ x: 15, y: 1, h: 3, side: 'south', windowCols: 2, hueShift: -2 },

		// === Row 3-4 inner blocks (south-facing from row 2 street) ===
		{ x: 4, y: 3, h: 3, side: 'north', windowCols: 2, hueShift: 12 },
		{ x: 5, y: 3, h: 2, side: 'north', windowCols: 2, facadeStyle: 'modern', hueShift: -6 },
		{ x: 6, y: 3, h: 3, side: 'north', windowCols: 2, hasBalconies: true, hueShift: 4 },
		{ x: 8, y: 3, h: 2, side: 'north', windowCols: 2, hueShift: -10 },
		{ x: 9, y: 3, h: 3, side: 'north', windowCols: 2, facadeStyle: 'ornate', hueShift: 8 },
		{ x: 10, y: 3, h: 2, side: 'north', windowCols: 2, hueShift: -4 },
		{ x: 4, y: 4, h: 2, side: 'north', windowCols: 2, hueShift: 6 },
		{ x: 5, y: 4, h: 3, side: 'north', windowCols: 2, hasBalconies: true, hueShift: -7 },
		{ x: 6, y: 4, h: 2, side: 'north', windowCols: 2, hueShift: 3 },
		{ x: 8, y: 4, h: 3, side: 'north', windowCols: 2, facadeStyle: 'modern', hueShift: -12 },
		{ x: 9, y: 4, h: 2, side: 'north', windowCols: 2, hueShift: 9 },
		{ x: 10, y: 4, h: 2, side: 'north', windowCols: 2, hueShift: -1 },

		// === Left edge buildings (east-facing, row 5) ===
		{ x: 0, y: 5, h: 3, side: 'east', windowCols: 2, hasBalconies: true, facadeStyle: 'ornate', hueShift: -5 },
		{ x: 1, y: 5, h: 2, side: 'east', windowCols: 2, hueShift: 8 },

		// === Right edge buildings (west-facing, row 5) ===
		{ x: 17, y: 5, h: 4, side: 'west', windowCols: 3, hasBalconies: true, facadeStyle: 'ornate', hueShift: 6 },
		{ x: 18, y: 5, h: 3, side: 'west', windowCols: 2, facadeStyle: 'modern', hueShift: -9 },

		// === Row 6-7 inner blocks ===
		{ x: 4, y: 6, h: 3, side: 'south', windowCols: 2, hasBalconies: true, hueShift: -3 },
		{ x: 5, y: 6, h: 2, side: 'south', windowCols: 2, hueShift: 11 },
		{ x: 6, y: 6, h: 3, side: 'south', windowCols: 2, facadeStyle: 'modern', hueShift: -8 },
		{ x: 4, y: 7, h: 2, side: 'south', windowCols: 2, hueShift: 5 },
		{ x: 5, y: 7, h: 3, side: 'south', windowCols: 2, hasBalconies: true, hueShift: -11 },
		{ x: 6, y: 7, h: 2, side: 'south', windowCols: 2, hueShift: 7 },

		// === Center buildings (row 8-9) ===
		{ x: 7, y: 8, h: 3, side: 'south', windowCols: 2, facadeStyle: 'ornate', hueShift: 4 },
		{ x: 8, y: 8, h: 2, side: 'south', windowCols: 2, hueShift: -6 },
		{ x: 7, y: 9, h: 2, side: 'south', windowCols: 2, hueShift: 10 },
		{ x: 8, y: 9, h: 3, side: 'south', windowCols: 2, hasBalconies: true, hueShift: -4 },

		// === Left edge buildings (east-facing, row 10) ===
		{ x: 0, y: 10, h: 3, side: 'east', windowCols: 2, facadeStyle: 'modern', hueShift: 7 },
		{ x: 1, y: 10, h: 2, side: 'east', windowCols: 2, hueShift: -5 },

		// === Right edge buildings (west-facing, row 10) ===
		{ x: 17, y: 10, h: 4, side: 'west', windowCols: 3, hasBalconies: true, hueShift: -10 },
		{ x: 18, y: 10, h: 3, side: 'west', windowCols: 2, facadeStyle: 'ornate', hueShift: 2 },

		// === Row 11-12 inner blocks ===
		{ x: 4, y: 11, h: 2, side: 'north', windowCols: 2, hueShift: -7 },
		{ x: 5, y: 11, h: 3, side: 'north', windowCols: 2, hasBalconies: true, hueShift: 6 },
		{ x: 6, y: 11, h: 2, side: 'north', windowCols: 2, facadeStyle: 'modern', hueShift: -3 },
		{ x: 7, y: 11, h: 3, side: 'north', windowCols: 2, hueShift: 9 },
		{ x: 8, y: 11, h: 2, side: 'north', windowCols: 2, hueShift: -11 },
		{ x: 9, y: 11, h: 3, side: 'north', windowCols: 2, hasBalconies: true, facadeStyle: 'ornate', hueShift: 4 },
		{ x: 10, y: 11, h: 2, side: 'north', windowCols: 2, hueShift: -2 },
		{ x: 4, y: 12, h: 3, side: 'north', windowCols: 2, hueShift: 8 },
		{ x: 5, y: 12, h: 2, side: 'north', windowCols: 2, facadeStyle: 'modern', hueShift: -9 },
		{ x: 6, y: 12, h: 3, side: 'north', windowCols: 2, hasBalconies: true, hueShift: 5 },
		{ x: 7, y: 12, h: 2, side: 'north', windowCols: 2, hueShift: -6 },
		{ x: 8, y: 12, h: 3, side: 'north', windowCols: 2, hueShift: 10 },
		{ x: 9, y: 12, h: 2, side: 'north', windowCols: 2, hueShift: -4 },
		{ x: 10, y: 12, h: 3, side: 'north', windowCols: 2, facadeStyle: 'ornate', hueShift: 7 },

		// === Bottom buildings (row 14-15, north-facing) ===
		{ x: 15, y: 14, h: 4, side: 'north', windowCols: 3, hasBalconies: true, facadeStyle: 'ornate', hueShift: -8 },
		{ x: 16, y: 14, h: 3, side: 'north', windowCols: 2, facadeStyle: 'modern', hueShift: 6 },
		{ x: 15, y: 15, h: 3, side: 'north', windowCols: 2, hueShift: 3 },
		{ x: 16, y: 15, h: 2, side: 'north', windowCols: 2, hueShift: -5 },

		// === BACKDROP buildings (infinite city edges) ===
		// Top edge
		{ x: 0, y: -2, h: 5, side: 'south', windowCols: 3, hueShift: -15, backdrop: true },
		{ x: 1, y: -2, h: 4, side: 'south', windowCols: 2, hueShift: 10, backdrop: true },
		{ x: 2, y: -1, h: 6, side: 'south', windowCols: 3, hasBalconies: true, hueShift: -8, backdrop: true },
		{ x: 5, y: -1, h: 4, side: 'south', windowCols: 2, hueShift: 5, backdrop: true },
		{ x: 6, y: -2, h: 5, side: 'south', windowCols: 3, hueShift: -12, backdrop: true },
		{ x: 7, y: -1, h: 3, side: 'south', windowCols: 2, hueShift: 8, backdrop: true },
		{ x: 9, y: -2, h: 6, side: 'south', windowCols: 3, hasBalconies: true, hueShift: -5, backdrop: true },
		{ x: 10, y: -1, h: 4, side: 'south', windowCols: 2, hueShift: 12, backdrop: true },
		{ x: 12, y: -2, h: 5, side: 'south', windowCols: 3, hueShift: -10, backdrop: true },
		{ x: 13, y: -1, h: 4, side: 'south', windowCols: 2, hueShift: 7, backdrop: true },
		{ x: 16, y: -2, h: 6, side: 'south', windowCols: 3, hueShift: -3, backdrop: true },
		{ x: 17, y: -1, h: 4, side: 'south', windowCols: 2, hueShift: 9, backdrop: true },
		{ x: 19, y: -2, h: 5, side: 'south', windowCols: 2, hueShift: -7, backdrop: true },

		// Left edge
		{ x: -2, y: 0, h: 5, side: 'east', windowCols: 3, hueShift: -10, backdrop: true },
		{ x: -1, y: 1, h: 4, side: 'east', windowCols: 2, hueShift: 6, backdrop: true },
		{ x: -2, y: 3, h: 6, side: 'east', windowCols: 3, hasBalconies: true, hueShift: -12, backdrop: true },
		{ x: -1, y: 4, h: 4, side: 'east', windowCols: 2, hueShift: 8, backdrop: true },
		{ x: -2, y: 7, h: 5, side: 'east', windowCols: 3, hueShift: -6, backdrop: true },
		{ x: -1, y: 8, h: 3, side: 'east', windowCols: 2, hueShift: 11, backdrop: true },
		{ x: -2, y: 11, h: 6, side: 'east', windowCols: 3, hueShift: -9, backdrop: true },
		{ x: -1, y: 12, h: 4, side: 'east', windowCols: 2, hueShift: 5, backdrop: true },
		{ x: -2, y: 14, h: 5, side: 'east', windowCols: 2, hueShift: -4, backdrop: true },

		// Right edge
		{ x: 20, y: 0, h: 5, side: 'west', windowCols: 3, hueShift: 10, backdrop: true },
		{ x: 21, y: 1, h: 4, side: 'west', windowCols: 2, hueShift: -7, backdrop: true },
		{ x: 20, y: 3, h: 6, side: 'west', windowCols: 3, hasBalconies: true, hueShift: 5, backdrop: true },
		{ x: 21, y: 4, h: 3, side: 'west', windowCols: 2, hueShift: -11, backdrop: true },
		{ x: 20, y: 7, h: 5, side: 'west', windowCols: 3, hueShift: 8, backdrop: true },
		{ x: 21, y: 8, h: 4, side: 'west', windowCols: 2, hueShift: -3, backdrop: true },
		{ x: 20, y: 11, h: 6, side: 'west', windowCols: 3, hueShift: 12, backdrop: true },
		{ x: 21, y: 12, h: 4, side: 'west', windowCols: 2, hueShift: -8, backdrop: true },
		{ x: 20, y: 14, h: 5, side: 'west', windowCols: 2, hueShift: 6, backdrop: true },

		// Bottom edge
		{ x: 0, y: 16, h: 4, side: 'north', windowCols: 2, hueShift: -10, backdrop: true },
		{ x: 1, y: 17, h: 5, side: 'north', windowCols: 3, hueShift: 7, backdrop: true },
		{ x: 3, y: 16, h: 6, side: 'north', windowCols: 3, hasBalconies: true, hueShift: -5, backdrop: true },
		{ x: 4, y: 17, h: 4, side: 'north', windowCols: 2, hueShift: 9, backdrop: true },
		{ x: 6, y: 16, h: 5, side: 'north', windowCols: 3, hueShift: -8, backdrop: true },
		{ x: 7, y: 17, h: 3, side: 'north', windowCols: 2, hueShift: 11, backdrop: true },
		{ x: 9, y: 16, h: 6, side: 'north', windowCols: 3, hueShift: -12, backdrop: true },
		{ x: 10, y: 17, h: 4, side: 'north', windowCols: 2, hueShift: 6, backdrop: true },
		{ x: 12, y: 16, h: 5, side: 'north', windowCols: 2, hueShift: -4, backdrop: true },
		{ x: 13, y: 17, h: 4, side: 'north', windowCols: 3, hueShift: 10, backdrop: true },
		{ x: 17, y: 16, h: 5, side: 'north', windowCols: 2, hueShift: -7, backdrop: true },
		{ x: 18, y: 17, h: 4, side: 'north', windowCols: 2, hueShift: 4, backdrop: true },
	],
	hands: [
		// Surrounding start (11,5) at distance 4-7 — one per direction
		{ x: 7,  y: 5  },  // due west,      dist 4
		{ x: 15, y: 5  },  // due east,       dist 4
		{ x: 12, y: 2  },  // north-east,     dist 4
		{ x: 8,  y: 2  },  // north-west,     dist 6
		{ x: 14, y: 2  },  // north-east far, dist 6
		{ x: 11, y: 10 },  // due south,      dist 5
		{ x: 13, y: 10 },  // south-east,     dist 7
	],
	start: { x: 11, y: 5 },
};
