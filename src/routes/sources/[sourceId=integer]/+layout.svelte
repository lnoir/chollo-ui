<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import SourceDetail from '../../../lib/components/Docs/SourceDetail.svelte';
	import { apiService } from '../../../lib/services/api.service';
	import type { DocSourceRecord } from '../../../types';
	import { selectedSource } from '../../../stores/app.store';
	import { get } from 'svelte/store';

	let sourceId: number;
	let source: DocSourceRecord;

	afterNavigate(async ({ to }) => {
		sourceId = Number(to?.params?.sourceId);
		source = await apiService.getDocSource(sourceId);
    selectedSource.update(() => source);
	});
</script>

<section class="bg-gray-900 h-full rounded-md">
	<SourceDetail {source} />
  <div class="child-route p-10">
    <slot />
  </div>
</section>

