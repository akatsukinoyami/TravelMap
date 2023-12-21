<script lang="ts">
  import { Marker, Popup } from 'svelte-maplibre';
  import type { Mark } from '../types.js';
  
  export let marker: Mark;

  const [ id, lat, lng, name, icon ] = marker;
</script>

<Marker
  lngLat={[lng, lat]}
  class="border-gray-200 border shadow-2xl focus:outline-2 focus:outline-black w-8 h-8 bg-red-300 text-black rounded-full grid place-items-center"
>
  <img src='./icon/{icon || 'icon'}.png' alt={icon} width="30" />

  <Popup openOn="hover" offset={[0, -10]}>
    <div class="marker">
      <img src='./icon/{icon || 'icon'}.png' alt={icon} width="150" />
      <div>{@html name}</div>
    </div>
  </Popup>
</Marker>

<style>
  .marker {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>