<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { MapLibre } from 'svelte-maplibre';
  import Marker from './components/Marker.svelte';
  import Menu from './components/Menu/Menu.svelte';
  import utilsConstructor, { type Utils } from './utils.js';
  import type { Mark } from './types.js';

  let 
    style = "CartoCDN Positron",
    styles: Record<string, string>,
    utils: Writable<Utils>;
  
  onMount(async () => {
    const [markersResponse, stylesResponse] = await Promise.all([
      fetch('/markers.json'), fetch('/styles.json'),
    ])
    const [markersData, stylesData] = await Promise.all([
      markersResponse.json(), stylesResponse.json(),
    ])
    styles = stylesData;
    utils = writable(utilsConstructor(markersData));
  })
</script>

{#if $utils?.awoo && styles}
  <MapLibre 
    let:map
    center={[30.731689, 46.484213]}
    zoom={7}
    class="map"
    standardControls
    style={styles[style]}
  >
    <Menu {utils} {map} {styles} bind:style />
    {#each $utils.markers() as marker (marker.id)}
      <Marker {marker} />
    {/each}
  </MapLibre>
{/if}
