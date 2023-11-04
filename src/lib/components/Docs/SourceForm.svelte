<script lang="ts">
	import type { DocSource, DocSourceRecord } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
	import ButtonClose from "../Buttons/ButtonClose.svelte";
  import { emit } from '@tauri-apps/api/event';
	import { showToastError, showToastSuccess } from "../../helpers";

  export let source: DocSource | DocSourceRecord = {
    name: '',
    type: 'web',
    location: ''
  };

  let errors: Record<string, string[]>;
  let submitted = false;

  const { form, touched } = createForm<DocSource>({
    onSubmit(values) {
      submitted = true;
      sendData(values);
    },
    validate(values) {
      errors = { name: [], type: [], location: [] };
      if (!values.name?.trim()) errors.name.push('Name is required');
      if (!values.type?.trim()) errors.type.push('Type is required');
      if (!values.location?.trim()) errors.location.push('Location is required');
      return errors;
    },
    initialValues: {...source}
  });

  async function sendData(submitted: DocSource) {    
    if (!submitted) return;
    try {
      const latest = await apiService.saveDocSource(submitted);
      await emit('sources:refresh');
      await emit('drawer:close', {id: 'source-form', redirect: `/sources/${latest.id}`});
      showToastSuccess('Source created!');
    }
    catch(err: any) {
      console.error(err);
      showToastError(`There was an error while saving: ${err?.message || err}`);
    }
  }
</script>

<section class="container mx-auto">
  <form class="form p-6" use:form>
    <ButtonClose filled={true} on:click={() => emit('drawer:close', 'source-form')} />
    <label class="label mb-8" for="source-name">
      <span class="block mb-2">Name</span>
      <input id="source-name" name="name" type="text" placeholder="Source name" class="input rounded-md" />
      {#if submitted && errors.name?.length}
      {errors.name}
      {/if}
    </label>

    <label class="label mb-8" for="source-type">
      <span class="block mb-2">Type</span>
      <select id="source-type" name="type" class="select py-4">
        <option value="web">Web</option>
        <option value="drive">Drive</option>
      </select>
    </label>

    <label class="label mb-8" for="source-location">
      <span class="block mb-2">Location</span>
      <input id="source-location" name="location" type="text" placeholder="http://example.com" class="input rounded-md" />
      {#if submitted && errors.location?.length}
      {errors.location}
      {/if}
    </label>

    <!-- <Button type="submit" title="Save Source" /> -->
    <button type="submit" title="Save Source" class="btn variant-filled-primary">Create Source</button>
  </form>
</section>