<script lang="ts">
	import type { MapEntry } from '$lib/state/maps.svelte.js';

	let { map, onclick }: { map: MapEntry; onclick?: () => void } = $props();
</script>

<button class="map-card" {onclick}>
	<div class="preview">
		{#if map.icon === 'building'}
			<!-- Minimal isometric building silhouette -->
			<svg viewBox="0 0 80 80" class="icon">
				<!-- Right face (darker) -->
				<polygon points="40,20 64,33 64,58 40,45" fill="var(--color-fg)" opacity="0.18" />
				<!-- Left face -->
				<polygon points="16,33 40,20 40,45 16,58" fill="var(--color-fg)" opacity="0.32" />
				<!-- Top face -->
				<polygon points="40,8 64,21 40,34 16,21" fill="var(--color-fg)" opacity="0.52" />
			</svg>
		{:else if map.icon === 'tree'}
			<!-- Three-tier isometric pine silhouette -->
			<svg viewBox="0 0 80 80" class="icon">
				<!-- Trunk -->
				<line x1="40" y1="68" x2="40" y2="54" stroke="var(--color-fg)" stroke-width="2.5" opacity="0.35" />
				<!-- Tier 1 — bottom -->
				<polygon points="40,43 57,52 40,61 23,52" fill="var(--glow-color)" opacity="0.45" />
				<!-- Tier 2 — mid -->
				<polygon points="40,32 54,39 40,47 26,39" fill="var(--glow-color)" opacity="0.65" />
				<!-- Tier 3 — apex -->
				<polygon points="40,22 51,27 40,33 29,27" fill="var(--glow-color)" opacity="0.88" />
			</svg>
		{:else}
			<!-- Minimal factory: building + two chimney stubs -->
			<svg viewBox="0 0 80 80" class="icon">
				<!-- Chimney 1 -->
				<rect x="27" y="12" width="5" height="14" fill="var(--color-fg)" opacity="0.28" />
				<line x1="26" y1="12" x2="33" y2="12" stroke="var(--color-fg)" stroke-width="1.5" opacity="0.5" />
				<!-- Chimney 2 -->
				<rect x="38" y="16" width="5" height="10" fill="var(--color-fg)" opacity="0.28" />
				<line x1="37" y1="16" x2="44" y2="16" stroke="var(--color-fg)" stroke-width="1.5" opacity="0.5" />
				<!-- Right face -->
				<polygon points="40,26 64,39 64,64 40,51" fill="var(--color-fg)" opacity="0.18" />
				<!-- Left face -->
				<polygon points="16,39 40,26 40,51 16,64" fill="var(--color-fg)" opacity="0.32" />
				<!-- Top face -->
				<polygon points="40,14 64,27 40,40 16,27" fill="var(--color-fg)" opacity="0.52" />
			</svg>
		{/if}
	</div>
	<span class="name">{map.name}</span>
</button>

<style>
	.map-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 20px 16px;
		border-radius: 12px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		width: 100%;
		transition: box-shadow 0.2s;
	}
	.map-card:hover {
		box-shadow: var(--glow-soft);
	}
	.preview {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 8px;
		overflow: hidden;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon {
		width: 72%;
		height: 72%;
	}
	.name {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--color-fg);
	}
</style>
