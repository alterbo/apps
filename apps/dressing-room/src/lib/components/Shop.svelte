<script lang="ts">
import Spot from "./Spot.svelte"
import Character from "./Character.svelte"
import Cloth from "./Cloth.svelte"
import { genreState } from "../state/state.svelte";
import { spots } from "../data/spots";
</script>

<div
    class="shop"
    style="--columns: {spots.length - 1}"
    role="radiogroup"
    aria-label="Character options"
>
    {#each spots as item (item.id)}
        <div class={['spot-container', { large: item.id === 1 }]}>
            <Spot
                active={item.id === genreState.active}
                label={item.main
                    ? item.id === genreState.active
                        ? 'Character is censored'
                        : 'Censor character'
                    : item.id === genreState.active
                        ? 'Character is dressed'
                        : 'Dress character'}
                select={() => (genreState.active = item.id)}
            >
                {#snippet spot()}
                    <Character active={item.id === genreState.active} main={item.main} />
                    {#if !item.main}
                        <Cloth />
                    {/if}
                {/snippet}
            </Spot>
        </div>
    {/each}
</div>

<style>

.shop {
    display: grid;
    grid-template-columns: repeat(var(--columns, 7), minmax(120px, 1fr));
    grid-auto-rows: auto;
    gap: 3rem 1rem;
    margin-block: 3rem;
    margin-inline: auto;
    width: 100%;
    transition: grid-template-columns 0.3s;
}

@media (max-width: 900px) {
    .shop {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
}

@media (max-width: 600px) {
    .shop {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 2rem 0.5rem;
        margin-block: 1.5rem;
        margin-inline: auto;
    }
}

.spot-container {
    justify-self: center;
}

.large {
    grid-row: 1;
    grid-column: 1 / -1;
    justify-self: center;
    width: max-content;
}
</style>