<script lang="ts">
	import type { DocFormat, DocSourceRecord } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import { getSelectedSource, showToastSuccess } from "../../helpers";
	import { APP_EVENTS } from "../../../constants";

  export let format: DocFormat = {
    name: '',
    type: 'html',
    location: ''
  };
  export let source: DocSourceRecord = getSelectedSource();

  let errors: Record<string, string[]>;
  let submitted = false;
  

  const { form } = createForm<DocFormat>({
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
    initialValues: {...format}
  });

  async function sendData(submitted: DocFormat) {    
    if (!submitted) return;
    const data = {...submitted, source: source.id};
    const latest = await apiService.saveDocFormat(data);
    if (latest.id) {
      showToastSuccess(`'<em>${latest}</em>' saved to ${source.name}`, 'Format added!');
      closeForm();
    }
  }

  async function closeForm() {
    emit(APP_EVENTS.DRAWER_CLOSE, {redirect: `/sources/${source.id}/formats`});
  }
</script>

<section class="container mx-auto">
  <form class="form p-6" use:form>
    <ButtonClose filled={true} on:click={closeForm} />
    <label class="label my-8" for="format-name">
      <span class="block mb-2">Name</span>
      <input id="format-name" name="name" type="text" placeholder="Format name" class="input rounded-md" />
      {#if submitted && errors.name?.length}
      {errors.name}
      {/if}
    </label>

    <label class="label mb-8" for="format-type">
      <span class="block mb-2">Type</span>
      <select id="format-type" name="type" class="select py-4">
        <option value="html">HTML</option>
        <option value="json">JSON</option>
        <option value="xml">XML</option>
        <option value="text">TEXT</option>
      </select>
    </label>

    <label class="label mb-8" for="format-location">
      <span class="block mb-2">Location</span>
      <input id="format-location" name="location" type="text" placeholder="/relative-path" class="input rounded-md" />
      {#if submitted && errors.location?.length}
      {errors.location}
      {/if}
    </label>

    <!-- <Button type="submit" title="Save format" /> -->
    <button type="submit" title="Save format" class="btn rounded-md variant-filled-primary">Create format</button>
  </form>
</section>