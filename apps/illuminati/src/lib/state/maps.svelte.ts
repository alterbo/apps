export interface MapEntry {
	id: string;
	name: string;
	gridSize: { w: number; h: number };
	icon: 'building' | 'tree' | 'factory';
}

export function createMapsState() {
	let maps = $state<MapEntry[]>([
		{ id: 'city-streets', name: 'City Streets',   gridSize: { w: 20, h: 16 }, icon: 'building' },
		{ id: 'forest',       name: 'Forest',          gridSize: { w: 14, h: 11 }, icon: 'tree'     },
		{ id: 'industrial',   name: 'Industrial Zone', gridSize: { w: 16, h: 12 }, icon: 'factory'  },
	]);

	return {
		get maps() { return maps; },
	};
}

export type MapsState = ReturnType<typeof createMapsState>;
