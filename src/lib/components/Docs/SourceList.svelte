<script lang="ts">
	import type { DocSource } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import SourceListItem from "./SourceListItem.svelte";

	export let sources: DocSource[] = [];
  
	function handleClick() {
		console.log('create source clicked');
	}
</script>

<div class="p-4">
	<h1 class="text-2xl mb-4">Sources</h1>
	{#if sources?.length}
	<ul>
		{#each sources as source}
			<SourceListItem {source} />
		{/each}
	</ul>
	{:else}
	<p>You don't have any sources yet.</p>
	<!-- Put a button here to create a source -->
	<Button on:click={handleClick} title="Create a source" />
	{/if}
</div>
