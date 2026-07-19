
<script lang="ts">
import { Characters } from "../types/characters"
import MaleCensored from "../vectors/MaleCensored.svelte"
import FemaleCensored from "../vectors/FemaleCensored.svelte"
import Male from "../vectors/Male.svelte"
import Female from "../vectors/Female.svelte"
import { genreState } from "../state/state.svelte";

let { active, main } = $props()
</script>

<div data-active={active} class="character">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 100">>
    {#if genreState.genre === Characters.MALE}
      {#if main}
        <MaleCensored />
      {:else}
        <Male {active} />
      {/if}
    {:else}
      {#if main}
        <FemaleCensored />
      {:else}
        <Female {active} />
      {/if}
    {/if}
  </svg>
  <div class="mask"></div>
</div>

<style>
.character {
  display: grid;
  inset: 0;
  position: absolute;
  transition: transform 700ms cubic-bezier(0,1,.72,.95);
  transform: translateY(100%);
}

.character[data-active='true'] {
  transform: translateY(0);
}

svg {
  justify-self: center;
  margin-inline: auto;
  height: 100%;
}

:global([data-animations="false"]) .character {
  transition: none;
  transition-duration: 0;
}
</style>