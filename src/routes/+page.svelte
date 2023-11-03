<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '../lib/services/api.service';
	import type { DocSourceRecord } from '../types';
	import SourceListItem from '../lib/components/Docs/SourceListItem.svelte';

	let sources: DocSourceRecord[] = [];
	let ready = false;

	onMount(async () => {
		sources = await apiService.getDocSources();
		ready = true;
	});
</script>


{#if ready}
<ul class="list-nav p-10">
	{#each sources as source}
		<SourceListItem {source} />
	{/each}
</ul>
{/if}