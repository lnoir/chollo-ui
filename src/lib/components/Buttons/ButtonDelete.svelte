<script>
	import Chollocon from "$components/Icons/Chollocon.svelte";
	import Button from "./Button.svelte";
</script>

<Button size="sm" round={true} on:click {...$$restProps}>
  <Chollocon name="trash" size="20" />
</Button>