<script lang="ts">
	import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import IconClose from 'virtual:icons/tabler/x';

  export let filled = false;
  let variant: 'ghost' | 'ringed' = 'ghost'; 

  onMount(() => {
    variant = filled ? 'ghost' : 'ringed';
  });
</script>
<div class="flex justify-end">
  <Button size="sm" round={true} {variant} on:click>
    <IconClose />
  </Button>
</div>