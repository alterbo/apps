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

<svg
  class="shirt"
  viewBox="0 0 48 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <Pattern {prefix} />
  </defs>

    <g fill={`url(#${prefix}${pattern})`}>
        <path d="M13.4 33.6H7.8l-.5-10c0-.9.2-2.5.7-3.6s3.4-2 4.4-2l6.5-.4c.4 0 1.4-.5 2-2.6h6q0 .6.7 1.6c.3.5 1.2.9 1.6 1 1.7 0 5.5.3 6.8.5 1.7.1 2 .8 3.4 1.6 1.1.6 1 2.4.8 3.2l-.5 11h-5.4l.2-10.4L31.3 50h-15l-3-26.5z"/>
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