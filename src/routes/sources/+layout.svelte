<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { apiService } from '../../lib/services/api.service';
	import SourceList from '$components/Docs/SourceList.svelte';
	import type { DocSource } from '../../types';
	import { selectedSource } from '../../stores/app.store';
  import { listen } from '@tauri-apps/api/event';
	import { APP_EVENTS } from '../../constants';

  let sources: DocSource[] = [];
  let sub: any;

  onMount(async () => {
    refreshSources();
    sub = await listen(APP_EVENTS.SOURCES_REFRESH, refreshSources);
  });

  onDestroy(() => {
    if (sub) sub();
  });

  async function refreshSources() {
    sources = await apiService.getDocSources();
  }
</script>

<div class="grid grid-cols-2 dark:bg-gray-900">
  <div>
    <SourceList {sources} />
  </div>
  {#if $selectedSource}
  <div class="p-4">
    <slot />
  </div>
  {/if}
</div>
