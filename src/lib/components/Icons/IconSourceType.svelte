<script lang="ts">
	import Chollocon from './Chollocon.svelte';

  type SourceAlias = 'web' | 'drive';

  export let icon: SourceAlias = 'web';
  export let pixels = '20';
  export let inline = true;

  let name: SourceAlias = icon;
</script>

{#if icon}
<div class="{inline ? 'inline' : 'block'} max-w-sm">
  <Chollocon {name} size={pixels} />
</div>
{/if}