<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { TaskScheduledRecord } from '../../../types';
	import { selectedTask } from '../../../stores/app.store';
	import TaskDetail from '../../../lib/components/Tasks/TaskDetail.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	let task: TaskScheduledRecord;

	onMount(async () => {
		loadTask();
	});

	afterNavigate(async () => {
		loadTask();
	});

	function loadTask() {
		task = data.task;
    selectedTask.update(() => data.task);
	}
</script>

<section class="bg-gray-800 h-full rounded-md">
	<TaskDetail {task} />
  <div class="child-route p-4">
    <slot />
  </div>
</section>