<script lang="ts">
  let {
    label,
    checked = $bindable(false),
    onToggle,
  }: {
    label: string;
    checked?: boolean;
    onToggle: () => void;
  } = $props();
</script>

<div class="flex mb-4 capitalize items-baseline text-white font-sans">
  <label class="relative inline-block w-[30px] h-[17px] mr-2.5 shrink-0">
    <input
      type="checkbox"
      class="peer opacity-0 w-0 h-0"
      bind:checked
      onclick={onToggle}
    />
    <div class="
      absolute cursor-pointer inset-0 bg-[#ccc] rounded-[34px]
      transition-all duration-400
      peer-checked:bg-[#2196f3] peer-checked:shadow-[0_0_1px_#2196f3]
      before:content-[''] before:absolute before:h-[13px] before:w-[13px]
      before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full
      before:transition-all before:duration-400
      peer-checked:before:translate-x-[13px]
    "></div>
  </label>
  {#if label}{label}{/if}
</div>
