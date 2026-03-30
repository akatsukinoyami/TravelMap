<script lang="ts">
  import { Marker, Popup } from 'svelte-maplibre';
  import type { Mark } from '../types.js';

  let { marker }: { marker: Mark } = $props();

  const { lat, lng, object, city, country, comment, icon } = $derived(marker);
  const name = $derived([object, city, country].filter(v => v).join(", "));
</script>

<Marker
  lngLat={[lng, lat]}
  class="border-transparent border shadow-2xl focus:outline-2 focus:outline-black w-8 h-8 bg-transparent text-black rounded-full grid place-items-center"
>
  <img src="./thumb/{icon || 'icon'}.png" alt={icon} width="30" loading="lazy" decoding="async" />

  <Popup openOn="hover" offset={[0, -10]}>
    <div class="flex flex-col items-center">
      <img src="./icon/{icon || 'icon'}.png" alt={icon} width="150" loading="lazy" decoding="async" />
      <div>{name}</div>
      <div>{@html comment}</div>
    </div>
  </Popup>
</Marker>
