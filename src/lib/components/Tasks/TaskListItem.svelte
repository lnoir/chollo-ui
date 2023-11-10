<script lang="ts">
	import { selectedTask } from "../../../stores/app.store";
	import type { TaskScheduledRecord } from "../../../types";
	import { showToastSuccess } from "../../helpers";
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import { goto } from "$app/navigation";
	import GenericListItem from "../GenericListItem.svelte";

  export let task: TaskScheduledRecord;

  function clickAction() {
    console.log('@task', task);
    selectedTask.update(() => task);
  }

  async function deleteAction() {
    await apiService.deleteTask(task.id);
    await emit('tasks:refresh');
    goto('/tasks');
    showToastSuccess('Task removed!');
  }
</script>

<GenericListItem
  icon="arrows"
  selected={$selectedTask?.id === task.id}
  label="Task {task.id}"
  href="/tasks/{task.id}"
  {deleteAction}
  on:click={clickAction}
/>