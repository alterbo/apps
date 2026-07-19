<script lang="ts">
  import FormulusColumn from './FormulusColumn.svelte';
  import FiveDefault from './ornaments/five-default.svelte';
  import FiveError from './ornaments/five-error.svelte';
  import FiveSuccess from './ornaments/five-success.svelte';
  import FourDefault from './ornaments/four-default.svelte';
  import FourError from './ornaments/four-error.svelte';
  import FourSuccess from './ornaments/four-success.svelte';
  import OneDefault from './ornaments/one-default.svelte';
  import OneError from './ornaments/one-error.svelte';
  import OneSuccess from './ornaments/one-success.svelte';
  import ThreeDefault from './ornaments/three-default.svelte';
  import ThreeError from './ornaments/three-error.svelte';
  import ThreeSuccess from './ornaments/three-success.svelte';
  import TwoDefault from './ornaments/two-default.svelte';
  import TwoError from './ornaments/two-error.svelte';
  import TwoSuccess from './ornaments/two-success.svelte';


    type InputType = 'email' | 'tel' | 'number';

    let type = $state<InputType>('email');
    let input = $state<string>('');
    let validating = $state(false);


    let validated = $state(false);
    let isValid = $state(false);

    function computeIsValid(t: InputType, value: string) {
        const v = value.trim();
        if (!v) return false;

        if (t === 'email') {
            // simple email check
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }

        if (t === 'tel') {
            // simple phone check (digits + basic symbols)
            return /^[+()\-\s0-9]{7,}$/.test(v);
        }

        // t === 'number'
        const n = Number(v);
        return Number.isFinite(n);
    }

    async function handleValidation() {
        validating = true;

        await Promise.resolve();

        validated = true;
        isValid = computeIsValid(type, input);

        validating = false;
    }
</script>

<div class="content-end gap-7 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end mx-auto px-12 w-full">
    <div class="flex flex-col h-full px-3">
        <div class="border border-slate-400 p-7 rounded dark:border-slate-500">
            <label class="block mb-2" for="type">Type</label>
            <select
                class="border border-slate-400 p-1 dark:border-slate-500"
                id="type"
                name="type"
                bind:value={type}
            >
                <option value="email">Email</option>
                <option value="tel">Phone</option>
                <option value="number">Number</option>
            </select>
        </div>

        {#key validating}
            <FormulusColumn {validating}>
                <div class="content-between grid grid-cols-5 grid-rows-1 h-full">
                    <div class="col-start-1 col-end-4">
                        {#if !validated}
                            <TwoDefault />
                        {:else if isValid}
                            <TwoSuccess />
                        {:else}
                            <TwoError />
                        {/if}
                    </div>

                    <div class="col-start-2 col-end-5 h-[70%] self-end">
                        {#if !validated}
                            <ThreeDefault />
                        {:else if isValid}
                            <ThreeSuccess />
                        {:else}
                            <ThreeError />
                        {/if}
                    </div>
                </div>
            </FormulusColumn>
        {/key}
    </div>

    <div class="flex flex-col h-full px-3">
        <div class="border border-slate-400 p-7 rounded dark:border-slate-500">
            <label class="block mb-2" for="input">Input</label>
            <input
                class="border border-slate-400 p-1 w-full"
                id="input"
                name="input"
                type={type}
                bind:value={input}
            />
        </div>

        {#key validating}
            <FormulusColumn {validating}>
                <div class="content-between grid grid-cols-6 grid-rows-2 h-full">
                    <div class="col-start-1 col-span-4 max-h-[300px]">
                        {#if !validated}
                            <FourDefault />
                        {:else if isValid}
                            <FourSuccess />
                        {:else}
                            <FourError />
                        {/if}
                    </div>

                    <div class="col-start-1 col-end-4 self-end">
                        {#if !validated}
                            <OneDefault />
                        {:else if isValid}
                            <OneSuccess />
                        {:else}
                            <OneError />
                        {/if}
                    </div>

                    <div class="col-end-7 col-span-2">
                        {#if !validated}
                            <FiveDefault />
                        {:else if isValid}
                            <FiveSuccess />
                        {:else}
                            <FiveError />
                        {/if}
                    </div>
                </div>
            </FormulusColumn>
        {/key}
    </div>

    <div class="justify-self-center">
        <div class="flex justify-center border border-slate-400 p-7 rounded dark:border-slate-500">
            <button class="border border-slate-400" type="button" onclick={handleValidation}>
                Validate
            </button>
        </div>
        {#key validating}
            <FormulusColumn {validating}>
                <div></div>
            </FormulusColumn>
        {/key}
    </div>
</div>