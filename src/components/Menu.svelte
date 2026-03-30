<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getMapContext } from 'svelte-maplibre';
  import Details from './Details.svelte';
  import Switch from './Switch.svelte';

  import type { Writable } from 'svelte/store';
  import type { Utils } from '../types.js';

  let {
    utils,
    styles,
    style = $bindable(),
  }: {
    utils: Writable<Utils>;
    styles: Record<string, string>;
    style: string;
  } = $props();

  let hidden = $state(true);

  const { map } = $derived(getMapContext());

  function humanize(string: string): string {
    return string.split(/(?=[A-Z])/).join(' ');
  }

  function updateToggle(name: string) {
    $utils.toggles[name] = !$utils.toggles[name];
    localStorage.setItem('toggles', JSON.stringify($utils.toggles));
  }

  function travel(city: string): void {
    if (map) map.flyTo({ center: $utils.coordsByCity(city) });
  }
</script>

<button
  class="absolute right-0 top-2.5 h-[30px] w-5 z-999 text-white rounded-l-[7px] bg-black/80 border border-black/80 cursor-pointer"
  onclick={() => hidden = !hidden}
>
  {hidden ? "+" : "–"}
</button>

<form
  id="filters"
  class="p-4 absolute top-2.5 right-[22px] text-white bg-black/80 rounded-[10px] z-999 shadow-[0_10px_15px_rgb(0,0,0,0.6)] backdrop-blur-sm w-1/4"
  transition:fly={{ delay: 100, duration: 500, x: 100 }}
  {hidden}
>
  <Details summary="Countries {$utils.countries.length}" hr>
    {$utils.countries.join(', ')}
  </Details>
  <Details summary="Cities {$utils.cities.length}" hr>
    {#each $utils.cities as city, index}
      <button
        class="inline bg-transparent text-inherit border-0 p-0 font-[inherit] cursor-pointer hover:underline"
        onclick={(e) => { e.preventDefault(); travel(city); }}
      >
        {@html index === $utils.cities.length - 1 ? city : city + ",&nbsp;"}
      </button>
    {/each}
  </Details>
  <Details summary="Tags" hr>
    {#each Object.keys($utils.toggles) as name}
      <Switch checked={$utils.toggles[name]} onToggle={() => updateToggle(name)} label={humanize(name)} />
    {/each}
  </Details>
  <Details summary="Map providers">
    {#each Object.keys(styles) as styleName}
      <p>
        <input
          checked={style === styleName}
          onclick={() => style = styleName}
          type="radio"
          name="style"
          value={styleName}
        /> {styleName}
      </p>
    {/each}
  </Details>
</form>
