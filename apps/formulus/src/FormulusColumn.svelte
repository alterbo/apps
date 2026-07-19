<script>
    let { children, validating } = $props()
</script>

<div class="grid grid-cols-6">
    <div class="border-r border-t border-slate-300 ml-1 min-h-[10vh] rounded-(--arc-left-1) dark:border-slate-500"></div>
    <div class="border-r border-t border-slate-300 ml-1 min-h-[10vh] rounded-(--arc-left-2) dark:border-slate-500"></div>
    <div class="border-r border-t border-slate-300 ml-1 min-h-[10vh] rounded-(--arc-left-3) dark:border-slate-500"></div>
    <div class="border-l border-t border-slate-300 mr-1 min-h-[10vh] rounded-(--arc-right-1) dark:border-slate-500"></div>
    <div class="border-l border-t border-slate-300 mr-1 min-h-[10vh] rounded-(--arc-right-2) dark:border-slate-500"></div>
    <div class="border-l border-t border-slate-300 mr-1 min-h-[10vh] rounded-(--arc-right-3) dark:border-slate-500"></div>
</div>
<div class="column border-x border-t border-slate-300 grow min-h-[5vh] max-h-[672px] mx-[8%] relative dark:border-slate-500">
    {@render children()}
    <div class="absolute bg-vertical-stripes left-0 h-full inset-0 w-full -z-10 {validating ? 'bg-vertical-stripes' : ''}">
    </div>
</div>
<div class="border border-slate-400 h-6 mx-[5%] rounded"></div>
<div class="border border-slate-300 h-6 dark:border-slate-500"></div>