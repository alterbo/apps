/**
 * Forest — second map.
 *
 * A loop path through dense woodland.
 * The walkable route traces a rectangle around a dark interior clearing.
 */

import type { MapData, SectorType } from './city-streets.js';

const RAW = [
	//  0  1  2  3  4  5  6  7  8  9 10 11 12 13
	'. B B B B B B B B B B B B .'.split(' '), // 0
	'. B B B . . . . . . B B B .'.split(' '), // 1
	'. B B . . . . . . . . B B .'.split(' '), // 2
	'. B . h h h h h h h h . B .'.split(' '), // 3
	'. . . h . . . . . . h . . .'.split(' '), // 4
	'. . . h . . . . . . h . . .'.split(' '), // 5
	'. . . h . . . . . . h . . .'.split(' '), // 6
	'. B . h h h h h h h h . B .'.split(' '), // 7
	'. B B . . . . . . . . B B .'.split(' '), // 8
	'. B B B . . . . . . B B B .'.split(' '), // 9
	'. B B B B B B B B B B B B .'.split(' '), // 10
];

function parseChar(c: string): SectorType {
	switch (c) {
		case 'h': return 'street-h';
		case 'd': return 'street-d';
		case 'B': return 'building';
		default:  return 'empty';
	}
}

const grid: SectorType[][] = RAW.map(row => row.map(parseChar));

export const forest: MapData = {
	id: 'forest',
	name: 'Forest',
	width: 14,
	height: 11,
	grid,
	buildings: [
		// === Top canopy wall (row 0, south-facing) ===
		{ x: 2,  y: 0, h: 3, side: 'south', windowCols: 1, hueShift: 110, kind: 'tree' },
		{ x: 4,  y: 0, h: 2, side: 'south', windowCols: 1, hueShift: 120, kind: 'tree' },
		{ x: 6,  y: 0, h: 3, side: 'south', windowCols: 1, hueShift: 100, kind: 'tree' },
		{ x: 8,  y: 0, h: 2, side: 'south', windowCols: 1, hueShift: 115, kind: 'tree' },
		{ x: 10, y: 0, h: 3, side: 'south', windowCols: 1, hueShift: 108, kind: 'tree' },
		{ x: 12, y: 0, h: 2, side: 'south', windowCols: 1, hueShift: 112, kind: 'tree' },

		// === Upper inner trees (rows 1-2) ===
		{ x: 1,  y: 1, h: 2, side: 'south', windowCols: 1, hueShift: 105, kind: 'tree' },
		{ x: 3,  y: 1, h: 3, side: 'south', windowCols: 1, hueShift: 118, kind: 'tree' },
		{ x: 10, y: 1, h: 2, side: 'south', windowCols: 1, hueShift: 108, kind: 'tree' },
		{ x: 12, y: 1, h: 3, side: 'south', windowCols: 1, hueShift: 114, kind: 'tree' },
		{ x: 1,  y: 2, h: 3, side: 'east',  windowCols: 1, hueShift: 115, kind: 'tree' },
		{ x: 12, y: 2, h: 2, side: 'west',  windowCols: 1, hueShift: 110, kind: 'tree' },

		// === Side trees flanking the path (rows 3-7) ===
		{ x: 1,  y: 3, h: 2, side: 'east',  windowCols: 1, hueShift: 112, kind: 'tree' },
		{ x: 12, y: 3, h: 3, side: 'west',  windowCols: 1, hueShift: 107, kind: 'tree' },
		{ x: 1,  y: 7, h: 3, side: 'east',  windowCols: 1, hueShift: 108, kind: 'tree' },
		{ x: 12, y: 7, h: 2, side: 'west',  windowCols: 1, hueShift: 115, kind: 'tree' },

		// === Lower inner trees (rows 8-9) ===
		{ x: 1,  y: 8, h: 2, side: 'north', windowCols: 1, hueShift: 115, kind: 'tree' },
		{ x: 12, y: 8, h: 3, side: 'north', windowCols: 1, hueShift: 105, kind: 'tree' },
		{ x: 1,  y: 9, h: 3, side: 'north', windowCols: 1, hueShift: 110, kind: 'tree' },
		{ x: 3,  y: 9, h: 2, side: 'north', windowCols: 1, hueShift: 118, kind: 'tree' },
		{ x: 10, y: 9, h: 3, side: 'north', windowCols: 1, hueShift: 108, kind: 'tree' },
		{ x: 12, y: 9, h: 2, side: 'north', windowCols: 1, hueShift: 114, kind: 'tree' },

		// === Bottom canopy wall (row 10, north-facing) ===
		{ x: 2,  y: 10, h: 2, side: 'north', windowCols: 1, hueShift: 108, kind: 'tree' },
		{ x: 4,  y: 10, h: 3, side: 'north', windowCols: 1, hueShift: 115, kind: 'tree' },
		{ x: 6,  y: 10, h: 2, side: 'north', windowCols: 1, hueShift: 120, kind: 'tree' },
		{ x: 8,  y: 10, h: 3, side: 'north', windowCols: 1, hueShift: 105, kind: 'tree' },
		{ x: 10, y: 10, h: 2, side: 'north', windowCols: 1, hueShift: 112, kind: 'tree' },
		{ x: 12, y: 10, h: 3, side: 'north', windowCols: 1, hueShift: 108, kind: 'tree' },
	],
	hands: [
		// Inside the loop — dark interior clearing
		{ x: 5, y: 4 },
		{ x: 8, y: 4 },
		{ x: 5, y: 6 },
		{ x: 8, y: 6 },
		// Outside the loop — hidden in the woodland shadows
		{ x: 5, y: 1 },
		{ x: 8, y: 1 },
		{ x: 5, y: 9 },
		{ x: 8, y: 9 },
	],
	start: { x: 6, y: 3 },
};
