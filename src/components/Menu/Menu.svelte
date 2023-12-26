<script lang="ts">  
  import { fly } from 'svelte/transition';
  import Details from './Details.svelte';
  import Switch from './Switch.svelte';
  import type { Utils } from '../../utils.js';
  import type { Writable } from 'svelte/store';
  import type { Map } from 'svelte-maplibre';

  export let map: Map | null,
    utils: Writable<Utils>,
    styles: Record<string, string>,
    style: string,
    hidden=true;

  let cities: string[], countries: string[], toggles: Record<string, boolean>;
  $: { 
    cities = $utils.cities, 
    countries = $utils.countries, 
    toggles = $utils.toggles 
  }

  function humanize(string: string): string {
    return string.split(/(?=[A-Z])/).join(' ')
  }

  function updateToggle(name: string) {
    $utils.toggles[name] = !toggles[name];
    localStorage.setItem('toggles', JSON.stringify(toggles));
  }

  function travel(city: string): void {
    if (map) map.flyTo({ center: $utils.coordsByCity(city) });
  }

</script>

<button class="opener" on:click={() => hidden = !hidden}>
  {hidden ? "+" : "–"}
</button>

<form id="filters" transition:fly={{ delay: 100, duration: 500, x: 100 }} {hidden}>
  <Details summary="Countries {countries.length}" hr>
    {countries.join(', ')}
  </Details>
  <Details summary="Cities {cities.length}" hr>
    {#each cities as city, index}
      <button class="city-link" on:click|preventDefault={() => travel(city)}>
        {@html index === cities.length-1 ? city : city + ",&nbsp;"}
      </button>
    {/each}
  </Details>
  <Details summary="Tags" hr>
    {#each Object.entries(toggles) as [name, state]}
      <Switch bind:checked={state} onclick={() => updateToggle(name)}  label={humanize(name)} />
    {/each}
  </Details>
  <Details summary="Map providers">
    {#each Object.keys(styles) as styleName}
      <p>
        <input 
          checked={style===styleName} 
          on:click={() => style = styleName} 
          type="radio" 
          name="style" 
          value="{styleName}" 
        /> {styleName}
      </p>
    {/each}
  </Details>
</form>

<style lang="scss">
  #filters {
    padding: 1rem;
    position: absolute;
    top: 10px;
    right: 22px;
    color: white;
    background-color: rgba(0,0,0,0.8);
    border-radius: 10px;
    z-index: 999;
    box-shadow: rgb(0, 0, 0, 0.6) 0px 10px 15px;
    backdrop-filter: blur(2px);
    width: 25%;
  }

  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .city-link {
    display: inline;
  }

  .opener {
    right: 0;
    top: 10px;
    height: 30px;
    width: 20px;
    z-index: 999;
    color: white;
    position: absolute;
    border-radius: 7px 0px 0px 7px;
    background-color: rgba(0,0,0,0.8);
    border-color:  rgba(10,10,10,0.8);
  }
</style>