<script lang="ts">
  export let 
    summary: string,
    hr: boolean = false;
  let hidden = true;
</script>

<div class="details">
  <button class="summary" on:click|preventDefault={() => hidden = !hidden}>{summary}</button>
  <div class="content" {hidden}>
    <slot />
  </div>
</div>
<hr hidden={!hr}/>

<style lang="scss">
  .details {
    padding: 1rem;
    font-family: "Helvetica Neue";
  }
  .summary {
    text-transform: uppercase;
    font-weight: 300;

    &:hover {
      cursor: pointer;
    }
  }
  .content {
    padding-top: 1rem;
    text-align: justify;
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
</style>