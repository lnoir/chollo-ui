<script lang="ts">
	import { goto } from "$app/navigation";
	import { get } from "svelte/store";
	import { selectedStep, selectedTask } from "../../../stores/app.store";
	import type { TaskStepRecord } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";

  export let step: TaskStepRecord;
  const task = get(selectedTask);

  async function handleConfigBtnClick() {
    selectedStep.update(() => step);
    goto(`/tasks/${task.id}/formats/${step.id}`);
  }
</script>


<li class="dark:border-slate-700 rounded-md p-2 mb-2 flex justify-between">
  <div>
    <span class="font-mono text-sm text-gray-500 pr-2">{step.agent}</span>{step.skill}
  </div>
  <div>
    <Button size="sm" on:click={handleConfigBtnClick}>
      <Chollocon name="tool" size="18" />
    </Button>
  </div>
</li>
  