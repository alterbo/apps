<script lang="ts">
import ManShirt from "./ManShirt.svelte";
import WomanDress from "./WomanDress.svelte";
import { genreState } from "../state/state.svelte";
</script>

<div class="cloth">
    {#if genreState.genre === 'male'}
        <ManShirt />
    {:else}
        <WomanDress />
    {/if}
</div>

<style>
.cloth {
    inset: 0;
    position: absolute;
    line-height: 0;
    scale: 1.0125;
}
</style>