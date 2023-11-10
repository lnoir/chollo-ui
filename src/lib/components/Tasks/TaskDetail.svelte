<script lang="ts">
	import type { TaskScheduledRecord } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import { goto } from "$app/navigation";
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";
	import { afterUpdate } from "svelte";
	import { apiService } from "../../services/api.service";
	import { showToastError, showToastSuccess } from "../../helpers";

	export let task: TaskScheduledRecord;
  let job: any;

  function close() {
    goto(`/tasks`);
  }

  function toggleSteps() {
    const path = window.location.pathname.includes('/steps')
      ? `/tasks/${task.id}`
      : `/tasks/${task.id}/steps`;
    goto(path);
  }

  function toggleJob() {
    const path = window.location.pathname.includes('/job')
      ? `/tasks/${task.id}`
      : `/tasks/${task.id}/job`;
    goto(path);
  }

  function toggleLogs() {
    const path = window.location.pathname.includes('/logs')
      ? `/tasks/${task.id}`
      : `/tasks/${task.id}/logs`;
    goto(path);
  }

  async function enable() {
    try {
      job = await apiService.enableTaskJob(task.id);
      showToastSuccess('Job created!');
    }
    catch(err) {
      showToastError('Oops, that might not have worked...');
    }
  }

  async function disable() {
    try {
      await apiService.disableTaskJob(task.id);
      job = null;
      showToastSuccess('Job removed!');
    }
    catch(err) {
      showToastError('Oops, that might not have worked...');
    } 
  }

  afterUpdate(async () => {
    if (!task || job) return;
    try {
      job = await apiService.getTaskJob(task?.id);
    }
    catch(err) {
      console.warn(err);
    }
    console.log(job);
  });
</script>

{#if task?.id}
<div class="p-4">

  <ButtonClose filled={true} on:click={close} />

  <div class="inline-block mr-2">
    <Chollocon name="arrows" />    
  </div>
  <h1 class="text-2xl mb-4 inline-block">
    {task.name || task.id} 
  </h1>
	<p class="text-slate-500">{task.scheduled}</p>

  <div class="flex mt-8">
    <Button size="sm" on:click={toggleSteps}>
      Steps
    </Button>
    <div class="ml-2"></div>
    {#if !task.steps?.length}
    <p class="text-gray-500 flex flex-col justify-center">Add a task to enable this job.</p>
    {:else if job}
    <Button size="sm" prominance="primary" on:click={toggleJob} title="View Job" />
    <div class="ml-2">
      <Button size="sm" prominance="error" on:click={disable} title="Disable" />
    </div>
    {:else}
    <Button size="sm" prominance="success" on:click={enable} title="Enable" />
    {/if}
    <div class="ml-2">
    <Button size="sm" prominance="secondary" on:click={toggleLogs} title="Logs" />
    </div>
  </div>
</div>
{/if}