<script lang="ts">
	let { size = 80 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="logo"
	aria-hidden="true"
	focusable="false"
>
	<!-- Outer triangle -->
	<polygon
		points="50,8 92,82 8,82"
		stroke="var(--color-fg)"
		stroke-width="2"
		fill="none"
	/>
	<!-- Inner triangle -->
	<polygon
		points="50,30 72,70 28,70"
		stroke="var(--glow-color)"
		stroke-width="1.2"
		fill="none"
	/>
</svg>

<style>
	.logo {
		filter: drop-shadow(var(--glow-soft));
	}
</style>
