<script lang="ts">
  export let 
    label: string,
    checked = false,
    onclick: () => void,
    color = "#2196F3";
</script>

<div class="mb-1">
  <label class="switch">
    <input type="checkbox" bind:checked on:click={onclick}/>
    <div class="slider" />
  </label>
  {#if label}{label}{/if}
</div>

<style>
  .switch {
    position: relative;
    width: 30px;
    height: 17px;
    display: inline-block;
    margin-right: 10px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  .mb-1 {
    display: flex;
    margin-bottom: 1rem;
    text-transform: capitalize;
    align-items: baseline;
    color: white;
    font-family: "Helvetica Neue";
  }
</style>
