<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { apiService } from '../../../lib/services/api.service';
	import type { TaskScheduledRecord } from '../../../types';
	import { selectedTask } from '../../../stores/app.store';
	import TaskDetail from '../../../lib/components/Tasks/TaskDetail.svelte';

	let taskId: number;
	let task: TaskScheduledRecord;

	afterNavigate(async ({ to }) => {
		taskId = Number(to?.params?.taskId);
		if (!taskId) return;
		task = await apiService.getTask(taskId);
    selectedTask.update(() => task);
	});
</script>

<section class="bg-gray-800 h-full rounded-md">
	<TaskDetail {task} />
  <div class="child-route p-4">
    <slot />
  </div>
</section>