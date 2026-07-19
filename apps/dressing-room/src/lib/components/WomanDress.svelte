<script lang="ts">
import { onMount } from 'svelte'
import Pattern from "./Pattern.svelte";
import { pickPatternId } from '../utils/patterns';

let pattern = 'stripes'

const prefix = `shirt-${Math.random().toString(36).slice(2)}-`

onMount(() => {
  pattern = pickPatternId()
})
</script>

<svg class="shirt" viewBox="0 0 48 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <Pattern {prefix} />
    </defs>
    <g fill={`url(#${prefix}${pattern})`}>
        <path d="M15 27L16 21.5H17.5C18.5 27.5 24.6026 27.6325 26.5 27C29.5 26 28.1667 23.3333 28.5 21.5H31L32.5 27C32 28.1667 31.5 30.5 31.5 32.5C31.5 34.5 30 36.1667 29.5 36.5C29.3333 38.3333 29 42.5 29 44.5C29 47 31 50 31 51.5V61.5H16.5C14.5 58.5 17 49.5 17.5 48C18 46.5 18 39 17.5 37.5C17.1 36.3 16.3333 34.6667 16 34L15 27Z"/>
    </g>
</svg>

<style>
  .shirt {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>