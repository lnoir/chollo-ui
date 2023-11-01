<!-- src/components/DocSourceItemComponent.svelte -->
<script lang="ts">
  export let source: any;
</script>

<li class="border p-2 mb-2">
  <span class="block">{source.name}</span>
  <span class="block text-slate-500">{source.type}</span>
   <!-- Add edit and delete buttons here -->
</li>