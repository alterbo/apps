<script lang="ts">
    let {
        selected = false,
        ariaLabel,
        button,
        ...rest
    } = $props();

    let computedAriaLabel = $derived(ariaLabel ?? rest['aria-label'] ?? 'Icon button');
</script>

<button
    class="button"
    {...rest}
    type="button"
    data-selected={selected}
    aria-pressed={selected}
    aria-label={computedAriaLabel}
>
    {@render button()}
</button>

<style>
    .button {
        background-color: var(--color-button-bg);
        border: 0;
        border-radius: 8px;
        margin: 0;
        width: 5rem;
        height: 5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 1.2rem;
        
        &[data-selected='true'] {
            outline: 2px solid var(--color-text-muted);
            background-color: var(--color-button-bg);
        }

        &:hover,
        &:focus-visible {
            outline: 2px solid var(--color-link);
        }

        @media (max-width: 640px) {
            width: 3rem;
            height: 3rem;
            padding: 0.5rem;
            border-radius: 6px;
        }
    }
</style>