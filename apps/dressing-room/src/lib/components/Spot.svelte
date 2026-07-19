<script lang="ts">
    let { active = false, label, select, spot } = $props();

    function activate(event?: Event) {
        if (active) {
            event?.preventDefault();
            return;
        }
        select?.();
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
            event.preventDefault();
            activate(event);
        }
    }
</script>

<div
    class="spot"
    role="radio"
    aria-checked={active}
    aria-disabled={active}
    aria-label={label}
    tabindex="0"
    onclick={() => activate()}
    onkeydown={handleKeyDown}
>
    <div class="hole" aria-hidden="true"></div>
    {@render spot()}
</div>

<style>
.hole,
.hole::after {
    inset: 0;
    position: absolute;
    width: 100%;
}

.hole {
    background-color: var(--color-surface-1);
}

.hole::after {
    background-color: var(--color-surface-2);
    bottom: 0;
    content: '';
    height: 210%;
    top: 0;
    transform-style:preserve-3d;
    transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
}

.spot {
    clip-path: rect(0 100% 100% 0%);
    height: 9.375rem;
    margin-inline: auto;
    overflow: hidden;
    padding: 1.25rem;
    position: relative;
    width: 4.5rem;

    cursor: pointer;
}

.spot[aria-disabled='true'] {
    cursor: default;
    opacity: 0.75;
}

.spot {
    &:hover,
    &:focus-visible {
        .hole {
            background-color: var(--color-button-bg-hover);
        }
        .hole::after {
            background-color: var(--color-button-bg);
        }
    }
}
</style>