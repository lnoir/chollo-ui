<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import TaskList from "../../lib/components/Tasks/TaskList.svelte";
	import type { TaskScheduledRecord } from "../../types";
	import { apiService } from "../../lib/services/api.service";
	import { selectedTask } from "../../stores/app.store";
  import { listen } from '@tauri-apps/api/event';
	import { APP_EVENTS } from "../../constants";
  
  let tasks: TaskScheduledRecord;
  let sub: any;

  onMount(async () => {
    refreshTasks();
    sub = await listen(APP_EVENTS.TASKS_REFRESH, refreshTasks);
  });

  onDestroy(() => {
    if (sub) sub();
  });

  async function refreshTasks() {
    tasks = await apiService.getTasks();
  }
</script>

<div class="grid grid-cols-2 dark:bg-gray-900">
  <div>
    <TaskList {tasks} />
  </div>
  {#if $selectedTask}
  <div class="p-4">
    <slot />
  </div>
  {:else}
    <slot />
  {/if}
</div>