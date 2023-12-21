<script lang="ts">  
  import { fly } from 'svelte/transition';
  import Button from './Button.svelte';
  import Switch from './Switch.svelte';

  export let 
    toggles: Record<string, boolean>,
    styles: Record<string, string>,
    style: string,
    state = false;

  function humanize(string: string): string {
    return string.split(/(?=[A-Z])/).join(' ')
  }

  function updateToggle(name: string) {
    toggles[name] = !toggles[name];
    localStorage.setItem('toggles', JSON.stringify(toggles));
  }
</script>

<Button bind:state />

{#if state}
  <form id="filters" transition:fly={{ delay: 100, duration: 500, x: 100 }}>
    {#each Object.entries(toggles) as [name, state]}
      <Switch 
        bind:checked={state}
        onclick={() => updateToggle(name)} 
        label={humanize(name)}
      />
    {/each}

    <select name="Provider" bind:value={style}>
      {#each Object.keys(styles) as styleName}
        <option value={styleName}>{styleName}</option>
      {/each}
    </select>
  </form>
{/if}

<style>
  #filters {
    padding: 1rem;
    position: absolute;
    top: 10px;
    right: 22px;
    background-color: rgba(0,0,0,0.8);
    border-radius: 10px;
    z-index: 999;
    box-shadow: rgb(0, 0, 0, 0.6) 0px 10px 15px;
  }

  select {
    width: 100%;
  }
</style>