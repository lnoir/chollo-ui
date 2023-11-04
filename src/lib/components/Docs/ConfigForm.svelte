<script lang="ts">
	import type { DocConfig, DocFormatRecord } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import { APP_EVENTS, DRAWER_IDS } from "../../../constants";
	import { showToastSuccess } from "../../helpers";

  export let config: DocConfig = {
    selector: 'body',
    selector_type: 'element',
    js: false,
  };
  export let format: DocFormatRecord;

  let errors: Record<string, string[]>;
  let submitted = false;

  const { form } = createForm<DocConfig>({
    onSubmit(values) {
      submitted = true;
      sendData(values);
    },
    validate(values) {
      errors = { name: [], type: [], location: [] };
      if (!values.selector?.trim()) errors.name.push('Selector is required');
      if (!values.selector_type?.trim()) errors.selector_type.push('Selector type is required');
      return errors;
    },
    initialValues: {...config}
  });

  async function sendData(submitted: DocConfig) {    
    if (!submitted) return;
    const data = {...submitted, source: format.id};
    const latest = await apiService.saveDocConfig(data);
    if (latest.id) {
      showToastSuccess(`Configuration saved to '${format.name}'.`, 'Config saved!');
      closeForm();
    }
  }

  async function closeForm() {
    emit(APP_EVENTS.DRAWER_CLOSE, {id: DRAWER_IDS.CONFIG_FORM});
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