<script lang="ts">
	import { goto } from "$app/navigation";
	import type { DocSource } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import SourceListItem from "./SourceListItem.svelte";

	export let sources: DocSource[] = [];
	
	function handleClick() {
		goto('/sources/create');
	}
</script>

<div class="p-4 overflow-y-auto">
	<h1 class="text-2xl mb-8">Sources</h1>
	{#if sources?.length}
	<ul class="list-nav">
		{#each sources as source}
			<SourceListItem {source} />
		{/each}
	</ul>
	{:else}
	<p>You don't have any sources yet.</p>
	<Button on:click={handleClick} title="Create a source" />
	{/if}
</div>
