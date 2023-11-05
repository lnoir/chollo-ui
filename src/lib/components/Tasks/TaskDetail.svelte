<script lang="ts">
	import type { TaskScheduledRecord } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import { goto } from "$app/navigation";
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";

	export let task: TaskScheduledRecord;

  function close() {
    goto(`/tasks`);
  }

  function toggleSteps() {
    const path = window.location.pathname.includes('/steps')
      ? `/tasks/${task.id}`
      : `/tasks/${task.id}/steps`;
    goto(path);
  }
</script>

{#if task}
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
  </div>
</div>
{/if}