<script lang="ts">
  export let state: Boolean;
  $: text = state ? "–" : "+";
</script>

<button on:click={() => state = !state} >{text}</button>

<style>
  button {
    right: 0;
    top: 10px;
    height: 30px;
    z-index: 999;
    color: white;
    position: absolute;
    border-radius: 7px 0px 0px 7px;
    background-color: rgba(0,0,0,0.8);
    border-color:  rgba(10,10,10,0.8);
  }
</style>