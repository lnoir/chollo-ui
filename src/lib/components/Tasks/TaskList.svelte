<script lang="ts">
	import { onMount } from "svelte";
	import Button from "../Buttons/Button.svelte";
	import { goto } from "$app/navigation";
	import TaskListItem from "./TaskListItem.svelte";

	export let tasks: any = [];

	onMount(() => {
		console.log('@tasks', tasks.length, tasks)
	});

	function handleCreateBtnClick() {
		goto('/tasks/create');
	}
</script>

<div class="ml-6 p-4 overflow-y-auto">
	<h1 class="text-2xl mb-8">Tasks</h1>
	{#if tasks?.length}
	<ul class="list-nav">
		{#each tasks as task}
			<TaskListItem {task} />
		{/each}
	</ul>
	<div class="flex justify-end">
		<Button size="sm" on:click={handleCreateBtnClick} title="Add task" />
	</div>
	{:else}
	<p class="block mb-8">You don't have any tasks. Why not create one?</p>
	<Button on:click={handleCreateBtnClick} title="Create a task" />
	{/if}
</div>
