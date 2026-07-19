<script lang="ts">
import Genre from './lib/components/Genre.svelte'
import Shop from './lib/components/Shop.svelte'
import type { GenreType } from './lib/types/genre';
import { animations, genreState } from './lib/state/state.svelte';
import { onMount } from 'svelte';

onMount(() => {
  const params = new URLSearchParams(location.search)
  if (params.has('animations') && params.get('animations') === 'false') {
    animations.set(false)
  }
  const subscription = animations.subscribe(v => {
    document.documentElement.dataset.animations = v.toString()
  });
  return subscription
})
</script>

 <div class="dressing">
  <div class="container">
    <h1>Dressing room</h1>
    <h2>Alberto Ferrero. 2024</h2>
  </div>
  <main>
    <Genre select={(value: GenreType) => {
      genreState.genre = value
      genreState.active = 1
    }} />
      <div class="container">
        <Shop />
      </div>
  </main>
</div>

<style>
  .dressing {
    display: grid;
    margin-inline: auto;
  }
  .container {
    padding-inline: min(3vw, 3rem);
  }
</style>