<script lang="ts">
	import type { DocFormatRecord, TaskStepRecord } from "../../../types";
	import StepListItem from "./StepListItem.svelte";

	export let steps: TaskStepRecord[] = [];
</script>

<div class="p-4">
	{#if steps?.length}
	<ul class="list">
		{#each steps as step}
			<StepListItem {step} />
		{/each}
	</ul>
	{:else}
	<p>No tasks have been added yet.</p>
	{/if}
</div>
