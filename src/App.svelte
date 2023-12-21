<script lang="ts">
  import { MapLibre } from 'svelte-maplibre';
  import Marker from './components/Marker.svelte';
  import Menu from './components/Menu/Menu.svelte';
  import utilsConstructor from './utils.js';
  import { onMount } from 'svelte';
  import type { Mark } from './types.js';

  let style = "CartoCDN Positron";
  let styles: Record<string, string>;
  let toggles: Record<string, boolean>;
  let utils: Record<string, any>;
  let markers: Mark[];
  
  onMount(async () => {
    const [markersResponse, stylesResponse] = await Promise.all([
      fetch('/markers.json'), fetch('/styles.json'),
    ])
    const [markersData, stylesData] = await Promise.all([
      markersResponse.json(), stylesResponse.json(),
    ])
    utils = utilsConstructor(markersData);
    toggles = utils.createToggles();
    styles = stylesData;
  })

  $: if (utils?.awoo) {
    markers = utils.formatMarkers(toggles);
  }
</script>

{#if markers && styles}
  <Menu bind:toggles bind:styles bind:style />
  <MapLibre 
    center={[30.731689, 46.484213]}
    zoom={7}
    class="map"
    standardControls
    style={styles[style]}
  >
    {#each markers as marker (marker[0])}
      <Marker {marker} />
    {/each}
  </MapLibre>
{/if}
