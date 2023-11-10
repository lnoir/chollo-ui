<script lang="ts">
	import type { DocFormatRecord, DocSourceRecord, TaskScheduledIn } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
	import ButtonClose from "../Buttons/ButtonClose.svelte";
  import { emit } from '@tauri-apps/api/event';
	import { formatDate, formatTime, showToastError, showToastSuccess, showToastWarning } from "../../helpers";
	import { APP_EVENTS } from "../../../constants";
	import { onMount } from "svelte";

  type TimeFields = {
    'scheduled-date'?: string;
    'scheduled-time'?: string;
  }

  type TaskFormData = TaskScheduledIn & TimeFields;

  export let task: TaskFormData = {};

  let errors: Record<string, string[]>;
  let submitted = false;
  let sources: DocSourceRecord[];
  let selectedSource: DocSourceRecord;
  let selectedFormat: DocFormatRecord;
  let recurrenceUnit: string;
  let recurrenceValue: number;
  let recurring: boolean;
  let minDate: string;
  let minTime: string;

  const { form, touched } = createForm<TaskScheduledIn>({
    onSubmit(values) {
      submitted = true;
      sendData(values);
    },
    validate(values) {
      errors = { source: [], format: [], steps: [] };
      return errors;
    },
    initialValues: {...task}
  });

  async function sendData(submitted: TaskFormData) {    
    if (!submitted) return;
    if (!recurringIsValid()) showToastWarning('Please check your repeat settings')
    try {
      submitted.source = selectedSource.id;
      submitted.format = selectedFormat.id;
      if (submitted['scheduled-date'] && submitted['scheduled-time']) {
        submitted.scheduled = new Date(`${submitted['scheduled-date']}T${submitted['scheduled-time']}`).toISOString()
      }
      console.log(submitted);
      const latest = await apiService.saveTaskScheduled(submitted);
      await emit(APP_EVENTS.TASKS_REFRESH);
      await emit(APP_EVENTS.DRAWER_CLOSE, {redirect: `/tasks/${latest.id}`});
      showToastSuccess('Task created!');
    }
    catch(err: any) {
      console.error(err);
      showToastError(`There was an error while saving the task: ${err?.message || err}`);
    }
  }

  function recurringIsValid() {
    if (!recurring) return true;
    return !!recurrenceUnit && !!Number(recurrenceValue);
  }

  onMount(async () => {
    sources = await apiService.getDocSources();
    const now = new Date();
    minDate = formatDate(now);
    minTime = formatTime(now);
  });
</script>

<section class="container mx-auto">
  <form class="form p-6" use:form>
    <ButtonClose filled={true} on:click={() => emit('drawer:close', 'source-form')} />
    
    <label class="label mb-8" for="task-name">
      <span class="block mb-2">Name</span>
      <input id="task-name" name="name" type="text" placeholder="Get the best articles from..." class="input rounded-md" />
    </label>

    <label class="label mb-8" for="task-source">
      <span class="block mb-2">Source</span>
      <select id="task-source" name="source" class="select py-4"
        disabled={!sources?.length}
        bind:value={selectedSource}>
      {#if (sources?.length)}
        {#each sources as source}
        <option value={source}>{source.name}</option>
        {/each}
      {/if}
      </select>
    </label>

    <label class="label mb-8" for="task-format">
      <span class="block mb-2">Format</span>
      <select id="task-format" name="format" class="select py-4"
        placeholder={!task.source && !selectedSource ? 'No formats available' : 'Pick a format'}
        disabled={!task.source && !selectedSource}
        bind:value={selectedFormat}>

        {#if !task.source && !selectedSource}
          <option>No formats available</option>
        {:else if (selectedSource?.formats?.length)}
        {#each selectedSource.formats as format}
          <option value={format}>{format.name} [{format.type}]</option>
        {/each}
      {/if}
      </select>
    </label>

    <div class="flex justify-start mb-8">
      <label class="label" for="task-scheduled-date">
        <span class="block mb-2">Date</span>
        <input id="task-scheduled-date" name="scheduled-date" type="date" min={minDate} placeholder="dd/mm/yyyy" class="input rounded-md" />
      </label>

      <label class="label ml-4" for="task-scheduled-time">
        <span class="block mb-2">Time</span>
        <input id="task-scheduled-time" name="scheduled-time" type="time" placeholder="hh:mm" class="input rounded-md" />
      </label>
      <label class="label ml-4" for="task-recurring">
        <span class="block mb-2">Recurring?</span>
        <input id="task-recurring" name="recurring" type="checkbox"  class="input rounded-md h-8 w-8"
          bind:checked={recurring} />
      </label>
    </div>

    {#if recurring}
    <div class="mb-8">
      <div class="flex justify-start mb-0">
        <label class="label mr-4" for="task-recurrence-value">
          <span class="block mb-2">Frequency</span>
          <input id="task-recurrence-value" name="recurrence-value" type="number" placeholder="5" class="input rounded-md"
            bind:value={recurrenceValue} />
        </label>

        <label class="label" for="task-recurrence-unit">
          <span class="block mb-2">Period</span>
          <select id="task-recurrence-unit" name="recurrence-unit" class="select py-4"
            bind:value={recurrenceUnit}>
              <option value="minute">Minute</option>
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
          </select>
        </label>
      </div>
      {#if recurrenceUnit && recurrenceValue}
      <p class="mb-8 font-mono">Run every {recurrenceValue === 1 ? '' : recurrenceValue} {recurrenceUnit}{recurrenceValue === 1 ? '' :  's'}</p>
      {/if}
    </div>
    {/if}

    <!-- <Button type="submit" title="Save Source" /> -->
    <button type="submit" title="Save Source" class="btn variant-filled-primary">Create Source</button>
  </form>
</section>