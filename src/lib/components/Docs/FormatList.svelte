<script lang="ts">
	import type { DocFormatRecord } from "../../../types";
	import FormatListItem from "./FormatListItem.svelte";

	export let formats: DocFormatRecord[] = [];
</script>

<div class="p-4">
	{#if formats?.length}
	<ul class="list">
		{#each formats as format}
			<FormatListItem {format} />
		{/each}
	</ul>
	{:else}
	<p>No formats have been added yet</p>
	{/if}
</div>
