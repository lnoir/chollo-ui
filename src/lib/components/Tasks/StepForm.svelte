<script lang="ts">
	import type { DocConfig, TaskStep } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import { AGENTS, APP_EVENTS } from "../../../constants";
	import { showToastError, showToastSuccess } from "../../helpers";
	import { selectedTask } from "../../../stores/app.store";
	import { get } from "svelte/store";
	import { onMount } from "svelte";

  
  let errors: Record<string, string[]>;
  let submitted = false;
  let taskStep: TaskStep = {
    agent: '',
    skill: '',
    position: 0,
    params: '',
    filters: []
  };
  let selectedAgent: any;
  let selectedSkill: any;
  let agents: any;
  let agentKeys: any[];

  const task = get(selectedTask);

  onMount(() => {
    console.log(history.state);
    agents = AGENTS;
    agentKeys = Object.keys(agents);
    console.log(agentKeys);
  });

  const { form } = createForm<TaskStep>({
    onSubmit(values) {
      submitted = true;
      sendData(values);
    },
    validate(values) {
      errors = { agent: [], skill: [] };
      if (!values.agent?.trim()) errors.agent.push('You must select an agent');
      if (!values.skill) errors.skill.push('You must select a skill');
      return errors;
    },
    initialValues: {...taskStep}
  });

  async function sendData(submitted: TaskStep) {    
    if (!submitted) return;
    try {
      const task = get(selectedTask);
      const agent = selectedAgent.value;
      const skill = selectedSkill.value;
      const position = task.steps.length;
      const data = {...submitted, position, agent, skill, task: task.id};
      await apiService.saveTaskStep(data);
      showToastSuccess('Step saved!');
      closeForm();
    }
    catch(err) {
      showToastError('Failed to save config');
    }
  }

  async function closeForm() {
    const redirect = `/tasks/${task.id}/steps`;
    emit(APP_EVENTS.DRAWER_CLOSE, {redirect});
  }
</script>

<section class="container mx-auto">
  <form class="form p-6" use:form>
    
    <ButtonClose filled={true} on:click={() => closeForm()} />

    <h2 class="text-gray-400 mb-8"> <!-- @TODO: clean up once model is updated -->
      <span class="font-mono text-sm text-gray-500 pr-2">Task: {task.name || task.id}</span>
    </h2>

    <label class="label mb-8" for="step-agent">
      <span class="block mb-2">Agent</span>
      <select id="step-agent" name="agent" class="select py-4"
        bind:value={selectedAgent}>
      {#if (agentKeys?.length)}
        {#each agentKeys as key}
        <option value={agents[key]}>{agents[key].name}</option>
        {/each}
      {/if}
      </select>
    </label>

    <label class="label mb-8" for="step-skill">
      <span class="block mb-2">Skill</span>
      <select id="step-skill" name="skill" class="select py-4"
        placeholder={!task.source && !selectedAgent ? 'No skills available' : 'Pick a skill'}
        bind:value={selectedSkill}>

        {#if !selectedAgent}
          <option>No skills available</option>
        {:else if (selectedAgent?.skills?.length)}
        {#each selectedAgent.skills as skill}
          <option value={skill}>{skill.name}</option>
        {/each}
      {/if}
      </select>
    </label>
    
    <label class="label my-8" for="step-params">
      <span class="block mb-2">Parameters</span>
      <input id="step-params" name="params" type="text" placeholder="Data to pass to the AI" class="input rounded-md" />
    </label>

    <!-- <Button type="submit" title="Save format" /> -->
    <button type="submit" title="Save format" class="btn rounded-md variant-filled-primary">Save config</button>
  </form>
</section>