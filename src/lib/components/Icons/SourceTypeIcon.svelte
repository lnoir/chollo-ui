<script lang="ts">
  import WebIcon from 'virtual:icons/tabler/world-www';

  export let name = 'web';
  export let pixels = 20;
  export let inline = true;
</script>

<div class="{inline ? 'inline' : 'block'} max-w-sm">
  <WebIcon width={pixels} />
</div>