<script lang="ts">
	import { goto } from "$app/navigation";
	import { get } from "svelte/store";
	import Button from "../../../../lib/components/Buttons/Button.svelte";
	import { selectedTask } from "../../../../stores/app.store";
	import type { TaskScheduledRecord } from "../../../../types";
	import ButtonClose from "../../../../lib/components/Buttons/ButtonClose.svelte";
	import StepList from "../../../../lib/components/Tasks/StepList.svelte";

  let task: TaskScheduledRecord = get(selectedTask);
</script>

<div class="dark:bg-gray-700/60 p-6 rounded-md">
  <ButtonClose on:click={() => goto(`/sources/${task.id}`)} />
  <h2 class="text-2xl">Steps</h2>
  {#if task}
  <div class="flex my-8">
    <Button size="sm" on:click={() => goto(`/tasks/${task.id}/steps/create`)}>
      Add Step
    </Button>
  </div>
  {#if task.steps}
    <StepList steps={task.steps} />
  {/if}
  {/if}
</div>