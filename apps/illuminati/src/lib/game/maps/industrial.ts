/**
 * Industrial Zone — third map.
 *
 * A factory district with two horizontal corridors connected by
 * vertical service passages, surrounded by tall industrial blocks.
 */

import type { MapData, SectorType } from './city-streets.js';

const RAW = [
	//  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
	'. . . . . . . . . . . . . . . .'.split(' '), // 0
	'. B B B . . B B B . . B B B . .'.split(' '), // 1
	'. B B B . . B B B . . B B B . .'.split(' '), // 2
	'. B B B . . B B B . . B B B . .'.split(' '), // 3
	'. . . . . . . . . . . . . . . .'.split(' '), // 4
	'h h h h h h h h h h h h h h h .'.split(' '), // 5
	'. . . . h . . . . . h . . . . .'.split(' '), // 6
	'. . . . h . B B B . h . B B B .'.split(' '), // 7
	'. . . . h . B B B . h . B B B .'.split(' '), // 8
	'h h h h h h h h h h h h h h h .'.split(' '), // 9
	'. . . . . . . . . . . . . . . .'.split(' '), // 10
	'. . . . . . . . . . . . . . . .'.split(' '), // 11
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

export const industrial: MapData = {
	id: 'industrial',
	name: 'Industrial Zone',
	width: 16,
	height: 12,
	grid,
	buildings: [
		// === Top factory block — left (rows 1-3, cols 1-3) ===
		{ x: 1, y: 1, h: 5, side: 'south', windowCols: 2, facadeStyle: 'modern',  hueShift: -20, kind: 'factory' },
		{ x: 2, y: 1, h: 6, side: 'south', windowCols: 3, facadeStyle: 'modern',  hueShift: -25, kind: 'factory' },
		{ x: 3, y: 1, h: 5, side: 'south', windowCols: 2,                         hueShift: -15, kind: 'factory' },
		{ x: 1, y: 2, h: 4, side: 'south', windowCols: 2,                         hueShift: -10, kind: 'factory' },
		{ x: 2, y: 2, h: 5, side: 'south', windowCols: 3,                         hueShift: -20, kind: 'factory' },
		{ x: 3, y: 2, h: 4, side: 'south', windowCols: 2,                         hueShift: -12, kind: 'factory' },
		{ x: 1, y: 3, h: 3, side: 'south', windowCols: 2,                         hueShift: -8,  kind: 'factory' },
		{ x: 2, y: 3, h: 4, side: 'south', windowCols: 3, facadeStyle: 'modern',  hueShift: -18, kind: 'factory' },
		{ x: 3, y: 3, h: 3, side: 'south', windowCols: 2,                         hueShift: -10, kind: 'factory' },

		// === Top factory block — centre (rows 1-3, cols 6-8) ===
		{ x: 6, y: 1, h: 5, side: 'south', windowCols: 2, facadeStyle: 'modern',  hueShift: -22, kind: 'factory' },
		{ x: 7, y: 1, h: 6, side: 'south', windowCols: 3, facadeStyle: 'modern',  hueShift: -28, kind: 'factory' },
		{ x: 8, y: 1, h: 5, side: 'south', windowCols: 2,                         hueShift: -18, kind: 'factory' },
		{ x: 6, y: 2, h: 4, side: 'south', windowCols: 2,                         hueShift: -15, kind: 'factory' },
		{ x: 7, y: 2, h: 5, side: 'south', windowCols: 3,                         hueShift: -25, kind: 'factory' },
		{ x: 8, y: 2, h: 4, side: 'south', windowCols: 2,                         hueShift: -10, kind: 'factory' },
		{ x: 6, y: 3, h: 3, side: 'south', windowCols: 2,                         hueShift: -12, kind: 'factory' },
		{ x: 7, y: 3, h: 4, side: 'south', windowCols: 3, facadeStyle: 'modern',  hueShift: -20, kind: 'factory' },
		{ x: 8, y: 3, h: 3, side: 'south', windowCols: 2,                         hueShift: -8,  kind: 'factory' },

		// === Top factory block — right (rows 1-3, cols 11-13) ===
		{ x: 11, y: 1, h: 5, side: 'south', windowCols: 2,                        hueShift: -18, kind: 'factory' },
		{ x: 12, y: 1, h: 6, side: 'south', windowCols: 3, facadeStyle: 'modern', hueShift: -22, kind: 'factory' },
		{ x: 13, y: 1, h: 5, side: 'south', windowCols: 2,                        hueShift: -12, kind: 'factory' },
		{ x: 11, y: 2, h: 4, side: 'south', windowCols: 2,                        hueShift: -8,  kind: 'factory' },
		{ x: 12, y: 2, h: 5, side: 'south', windowCols: 3,                        hueShift: -20, kind: 'factory' },
		{ x: 13, y: 2, h: 4, side: 'south', windowCols: 2,                        hueShift: -15, kind: 'factory' },
		{ x: 11, y: 3, h: 3, side: 'south', windowCols: 2,                        hueShift: -10, kind: 'factory' },
		{ x: 12, y: 3, h: 4, side: 'south', windowCols: 3, facadeStyle: 'modern', hueShift: -25, kind: 'factory' },
		{ x: 13, y: 3, h: 3, side: 'south', windowCols: 2,                        hueShift: -8,  kind: 'factory' },

		// === Inner blocks — centre-left (rows 7-8, cols 6-8) ===
		{ x: 6, y: 7, h: 4, side: 'north', windowCols: 2,                         hueShift: -15, kind: 'factory' },
		{ x: 7, y: 7, h: 5, side: 'north', windowCols: 3, facadeStyle: 'modern',  hueShift: -20, kind: 'factory' },
		{ x: 8, y: 7, h: 4, side: 'north', windowCols: 2,                         hueShift: -10, kind: 'factory' },
		{ x: 6, y: 8, h: 3, side: 'north', windowCols: 2,                         hueShift: -8,  kind: 'factory' },
		{ x: 7, y: 8, h: 4, side: 'north', windowCols: 3,                         hueShift: -18, kind: 'factory' },
		{ x: 8, y: 8, h: 3, side: 'north', windowCols: 2,                         hueShift: -12, kind: 'factory' },

		// === Inner blocks — centre-right (rows 7-8, cols 12-14) ===
		{ x: 12, y: 7, h: 4, side: 'north', windowCols: 2,                        hueShift: -12, kind: 'factory' },
		{ x: 13, y: 7, h: 5, side: 'north', windowCols: 3, facadeStyle: 'modern', hueShift: -22, kind: 'factory' },
		{ x: 14, y: 7, h: 4, side: 'north', windowCols: 2,                        hueShift: -8,  kind: 'factory' },
		{ x: 12, y: 8, h: 3, side: 'north', windowCols: 2,                        hueShift: -10, kind: 'factory' },
		{ x: 13, y: 8, h: 4, side: 'north', windowCols: 3,                        hueShift: -20, kind: 'factory' },
		{ x: 14, y: 8, h: 3, side: 'north', windowCols: 2,                        hueShift: -15, kind: 'factory' },
	],
	hands: [
		// Open staging areas above the main corridor
		{ x: 2,  y: 0 },
		{ x: 8,  y: 0 },
		{ x: 13, y: 0 },
		// Dead zones between corridor and factory blocks
		{ x: 2,  y: 4 },
		{ x: 13, y: 4 },
		// Dark passages between the two corridors
		{ x: 7,  y: 6 },
		{ x: 9,  y: 6 },
		// Below the second corridor
		{ x: 4,  y: 10 },
		{ x: 11, y: 10 },
	],
	start: { x: 7, y: 5 },
};
