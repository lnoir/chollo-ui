<script lang="ts">
	import type { DocConfig } from "../../../types";
  import { createForm } from 'felte';
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import ButtonClose from "../Buttons/ButtonClose.svelte";
	import { APP_EVENTS, DRAWER_IDS } from "../../../constants";
	import { showToastError, showToastSuccess } from "../../helpers";
	import { selectedFormat } from "../../../stores/app.store";
	import { get } from "svelte/store";

  
  let errors: Record<string, string[]>;
  let submitted = false;
  let config: DocConfig = {
    selector: '',
    selector_type: 'element',
    js: false,
  };

  const { form } = createForm<DocConfig>({
    onSubmit(values) {
      submitted = true;
      sendData(values);
    },
    validate(values) {
      errors = { selector: [], selector_type: [], js: [] };
      if (!values.selector?.trim()) errors.selector.push('Selector is required');
      if (!values.selector_type) errors.selector_type.push('Selector type is required');
      return errors;
    },
    initialValues: {...config}
  });

  async function sendData(submitted: DocConfig) {    
    if (!submitted) return;
    try {
      const format = get(selectedFormat);
      const data = {...submitted, format: format.id};
      await apiService.saveDocConfig(data);
      showToastSuccess(`Configuration saved to '${format.name}'.`, 'Config saved!');
      closeForm();
    }
    catch(err) {
      showToastError('Failed to save config');
    }
  }

  async function closeForm() {
    const redirect = window.location.pathname.split(/\/\d+\/config$/)[0];
    emit(
      APP_EVENTS.DRAWER_CLOSE,
      {id: DRAWER_IDS.CONFIG_FORM, redirect}
    );
  }
</script>

<section class="container mx-auto">
  <form class="form p-6" use:form>
    
    <ButtonClose filled={true} on:click={closeForm} />

    <h2 class="text-gray-400 mb-8">
      <span class="font-mono text-sm text-gray-500 pr-2">{$selectedFormat.type}</span>{$selectedFormat.name}
    </h2>

    <label class="label mb-8" for="config-selector-type">
      <span class="block mb-2">Selector Type</span>
      <select id="config-selector-type" name="selector-type" class="select py-4">
        <option value="element">Element</option>
        <option value="pattern">Pattern</option>
      </select>
    </label>
    
    <label class="label my-8" for="format-name">
      <span class="block mb-2">Selector</span>
      <input id="config-selector" name="selector" type="text" placeholder="div.some-class" class="input rounded-md" />
      {#if submitted && errors.selector?.length}
      {errors.selector}
      {/if}
    </label>

    <label class="label mb-8 cursor-pointer" for="config-js">
      <span class="block mb-2">Enable JavaScript?</span>
      <input id="config-js" name="js" type="checkbox" class="input rounded-md" />
    </label>

    <!-- <Button type="submit" title="Save format" /> -->
    <button type="submit" title="Save format" class="btn rounded-md variant-filled-primary">Save config</button>
  </form>
</section>