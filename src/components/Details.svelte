<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    summary,
    hr = false,
    children,
  }: {
    summary: string;
    hr?: boolean;
    children: Snippet;
  } = $props();

  let hidden = $state(true);
</script>

<div class="p-4 font-sans">
  <button
    class="uppercase font-light bg-transparent text-inherit border-0 p-0 font-[inherit] cursor-pointer outline-inherit"
    onclick={(e) => { e.preventDefault(); hidden = !hidden; }}
  >
    {summary}
  </button>
  <div class="pt-4 text-justify" {hidden}>
    {@render children()}
  </div>
</div>
<hr hidden={!hr} />
