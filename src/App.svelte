<script lang="ts">
  import { onMount } from 'svelte';
  import { MapLibre } from 'svelte-maplibre';
  import { type Writable } from 'svelte/store';
  import { parse } from 'yaml';

  import Marker from './components/Marker.svelte';
  import Menu from './components/Menu.svelte';
  import utilsConstructor from './utils.js';
  import type { Utils } from './types.js';

  const STYLE_KEY = 'mapStyle';
  let style = $state(localStorage.getItem(STYLE_KEY) ?? "CartoCDN Positron");

  $effect(() => { localStorage.setItem(STYLE_KEY, style); });
  let styles = $state<Record<string, string> | undefined>(undefined);
  let utils = $state<Writable<Utils> | undefined>(undefined);

  $effect(() => {
    if (location.pathname !== '/') {
      location.pathname = '/';
    }
  });

  onMount(() => {
    fetch('/styles.yaml')
      .then(r => r.text())
      .then(data => { styles = parse(data); });

    fetch('/markers.yaml')
      .then(r => r.text())
      .then(data => { utils = utilsConstructor(parse(data)); });
  });
</script>

{#if utils && $utils?.awoo && styles}
  <MapLibre
    center={[30.731689, 46.484213]}
    zoom={7}
    class="map"
    standardControls
    style={styles[style]}
  >
    <Menu {utils} {styles} bind:style />
    {#each $utils.markers() as marker (marker.id)}
      <Marker {marker} />
    {/each}
  </MapLibre>
{/if}
