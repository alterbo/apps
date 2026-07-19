<script lang="ts">
import IconButton from "./IconButton.svelte";
import WcFemale from "../vectors/WcFemale.svelte";
import WcMale from "../vectors/WcMale.svelte";
import { animations, genreState } from "../state/state.svelte";

let { select } = $props();
</script>

<div class="container" role="group" aria-label="Gender">
    <IconButton
        ariaLabel="Select male gender"
        selected={genreState.genre === 'male'}
        onclick={() => select('male')}
        value="male"
    >
        {#snippet button()}
            <WcMale />
        {/snippet}
    </IconButton>
    <IconButton
        ariaLabel="Select female gender"
        selected={genreState.genre === 'female'}
        onclick={() => select('female')}
        value="female"
    >
        {#snippet button()}
            <WcFemale />
        {/snippet}
    </IconButton>
    <label class="animations-toggle">
      <input type="checkbox" bind:checked={$animations} />
      <span>Animations</span>
    </label>
</div>

<style>
    .container {
        align-items: center;
        background-color: var(--color-surface-2);
        display: flex;
        gap: 1rem;
        padding: 1.5rem min(3vw, 3rem);
    }

    .animations-toggle {
        margin-inline-start: auto;
    }
</style>