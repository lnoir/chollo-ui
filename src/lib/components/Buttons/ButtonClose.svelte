<script lang="ts">
	import { onMount } from "svelte";
  import Button from "./Button.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";

  export let filled = false;
  let variant: 'ghost' | 'ringed' = 'ghost'; 

  onMount(() => {
    variant = filled ? 'ghost' : 'ringed';
  });
</script>
<div class="flex justify-end">
  <Button size="sm" round={true} {variant} on:click title="Close" class="bg-red">
    <Chollocon name="close" size="20" />
  </Button>
</div>