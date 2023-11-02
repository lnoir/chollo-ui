<script lang="ts">
	import { onMount } from 'svelte';
	import SourceList from '../lib/components/Docs/SourceList.svelte';
	import { apiService } from '../lib/services/api.service';
	import type { DocSourceRecord } from '../types';

	let sources: DocSourceRecord[] = [];
	let ready = false;

	onMount(async () => {
		sources = await apiService.getDocSources();
		ready = true;
	});
</script>


{#if ready}
<SourceList {sources} />
{/if}