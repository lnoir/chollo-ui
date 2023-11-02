<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '../../lib/services/api.service';
	import SourceList from '$components/Docs/SourceList.svelte';
	import type { DocSource } from '../../types';
	import { selectedSource } from '../../stores/app.store';

  let sources: DocSource[] = [];

  onMount(async () => {
    sources = await apiService.getDocSources();
  });
</script>

<div class="grid grid-cols-2">
  <div>
    <SourceList {sources} />
  </div>
  {#if $selectedSource}
  <div class="p-4">
    <slot />
  </div>
  {/if}
</div>
