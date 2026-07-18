import type { Pos } from '$lib/game/grid.js';
import type { MapData, SectorType } from '$lib/game/maps/city-streets.js';
import { getSectorsInRange, getLightIntensity } from '$lib/game/light.js';

export type { Pos };

export interface Hand {
	id: number;
	x: number;
	y: number;
	state: 'idle' | 'fleeing' | 'gone';
	fleeTarget?: { x: number; y: number };
}

export function createGameState() {
	let mapData = $state<MapData | null>(null);
	let bulb = $state<Pos>({ x: 0, y: 0 });
	let hands = $state<Hand[]>([]);
	let score = $state(0);
	let discovered = $state(0);
	let lightRange = $state(3);
	let litSectors = $state(new Set<string>());
	let lastInteraction = $state(Date.now());
	let idle = $state(false);
	let idleTimer = $state<ReturnType<typeof setTimeout> | null>(null);

	function sectorAt(x: number, y: number): SectorType | undefined {
		if (!mapData) return undefined;
		const row = mapData.grid[y];
		return row?.[x];
	}

	function isWalkable(x: number, y: number): boolean {
		const s = sectorAt(x, y);
		return s === 'street-h' || s === 'street-d';
	}

	function canMove(dir: 'n' | 'e' | 's' | 'w'): boolean {
		const t = targetPos(dir);
		return isWalkable(t.x, t.y);
	}

	function targetPos(dir: 'n' | 'e' | 's' | 'w'): Pos {
		const d = { n: { x: 0, y: -1 }, e: { x: 1, y: 0 }, s: { x: 0, y: 1 }, w: { x: -1, y: 0 } };
		return { x: bulb.x + d[dir].x, y: bulb.y + d[dir].y };
	}

	function moveBulb(dir: 'n' | 'e' | 's' | 'w') {
		if (!canMove(dir)) return;
		const t = targetPos(dir);
		bulb = { x: t.x, y: t.y };
		litSectors = getSectorsInRange(bulb, lightRange, mapData!.width, mapData!.height);
		lastInteraction = Date.now();
		idle = false;
		checkHands();
	}

	function checkHands() {
		for (const h of hands) {
			if (h.state !== 'idle') continue;
			const key = `${h.x},${h.y}`;
			if (litSectors.has(key)) {
				h.state = 'fleeing';
				discovered++;
				computeFleeTarget(h);
			}
		}
	}

	function computeFleeTarget(h: Hand) {
		if (!mapData) return;
		// Flee toward the nearest edge of the scene
		const dx = h.x - bulb.x;
		const dy = h.y - bulb.y;
		const w = mapData.width;
		const ht = mapData.height;
		// Pick edge target: extend direction away from bulb, overshoot past grid bounds
		let tx = h.x + Math.sign(dx || 1) * (w + 5);
		let ty = h.y + Math.sign(dy || 1) * (ht + 5);
		// Clamp to a reasonable overshoot beyond the map edges
		tx = Math.max(-8, Math.min(w + 8, tx));
		ty = Math.max(-8, Math.min(ht + 8, ty));
		h.fleeTarget = { x: tx, y: ty };
	}

	function completeHandFlee(handId: number) {
		const h = hands.find(h => h.id === handId);
		if (h && h.state === 'fleeing') {
			h.state = 'gone';
			score++;
		}
	}

	function loadMap(data: MapData) {
		mapData = data;
		bulb = { ...data.start };
		score = 0;
		discovered = 0;
		idle = false;
		lastInteraction = Date.now();
		hands = data.hands.map((h, i) => ({
			id: i,
			x: h.x,
			y: h.y,
			state: 'idle' as const,
		}));
		litSectors = getSectorsInRange(bulb, lightRange, data.width, data.height);
	}

	function scheduleIdleCheck() {
		idleTimer = setTimeout(() => {
			if (Date.now() - lastInteraction > 30_000) {
				idle = true;
			} else {
				scheduleIdleCheck();
			}
		}, 1000);
	}

	function startIdleTimer() {
		if (idleTimer) clearTimeout(idleTimer);
		scheduleIdleCheck();
	}

	function stopIdleTimer() {
		if (idleTimer) {
			clearTimeout(idleTimer);
			idleTimer = null;
		}
	}

	function touch() {
		lastInteraction = Date.now();
		idle = false;
	}

	return {
		get mapData() { return mapData; },
		get bulb() { return bulb; },
		get hands() { return hands; },
		get score() { return score; },
		get discovered() { return discovered; },
		get lightRange() { return lightRange; },
		get idle() { return idle; },
		canMove,
		moveBulb,
		completeHandFlee,
		loadMap,
		startIdleTimer,
		stopIdleTimer,
		touch,
		get litSectors() { return litSectors; },
		getLightIntensity: (x: number, y: number) =>
			getLightIntensity({ x, y }, bulb, lightRange),
	};
}

export type GameState = ReturnType<typeof createGameState>;
