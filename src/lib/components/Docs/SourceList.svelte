<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DocSourceRecord } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import SourceListItem from "./SourceListItem.svelte";

	export let sources: DocSourceRecord[] = [];

	function handleClick() {
		goto('/sources/create');
	}
</script>


<div class="ml-6 p-4 overflow-y-auto">
	<h1 class="text-2xl mb-8">Sources</h1>

	{#if sources?.length}
	<ul class="list-nav">
		{#each sources as source}
			<SourceListItem {source} />
		{/each}
	</ul>
	<div class="flex justify-end">
		<Button size="sm" title="Add source" on:click={handleClick} />
	</div>
	{:else}
	<p class="block mb-8">You don't have any sources yet.</p>
	<Button on:click={handleClick} title="Create a source" />
	{/if}
</div>
