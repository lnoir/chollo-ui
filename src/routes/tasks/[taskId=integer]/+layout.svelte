<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { apiService } from '../../../lib/services/api.service';
	import type { TaskScheduledRecord } from '../../../types';
	import { selectedTask } from '../../../stores/app.store';
	import TaskDetail from '../../../lib/components/Tasks/TaskDetail.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	let taskId: number;
	let task: TaskScheduledRecord;

	afterNavigate(async () => {
		//taskId = Number(to?.params?.taskId);
		//if (!taskId) return;
		//task = await apiService.getTask(taskId);
		task = data.task;
    selectedTask.update(() => data.task);
	});
</script>

<section class="bg-gray-800 h-full rounded-md">
	<TaskDetail {task} />
  <div class="child-route p-4">
    <slot />
  </div>
</section>