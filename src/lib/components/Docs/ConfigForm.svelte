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
	import Button from "../Buttons/Button.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";

  
  let errors: Record<string, string[]>;
  let submitted = false;
  let config: DocConfig = get(selectedFormat).config || { 
    selector: '',
    selector_type: 'element',
    js: false,
    map: []
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

  function handleAddMapping() {
    if (!Array.isArray(config.map)) {
      config.map = [];
    }
    config.map.push({property: '', selector: '', type: 'string'});
    config = config;
  }

  function handleDeleteMap(i: number) {
    config.map?.splice(i, 1);
    config = config;
  }

  async function sendData(submitted: DocConfig) {    
    if (!submitted) return;
    try {
      const format = get(selectedFormat);
      const data = {...submitted, format: format.id, id: config.id};
      //return console.log(data);
      await apiService.saveDocConfig(data);
      showToastSuccess(`Configuration saved to <strong>${format.name}</strong>.`, 'Config saved!');
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
      <select id="config-selector-type" name="selector_type" class="select py-4"
        bind:value={config.selector_type}>
        <option value="element">Element</option>
        <option value="pattern">Pattern</option>
      </select>
    </label>
    
    <label class="label my-8" for="format-name">
      <span class="block mb-2">Selector</span>
      <input id="config-selector" name="selector" type="text" placeholder="div.some-class" class="input rounded-md"
        bind:value={config.selector} />
    </label>
    
    <fieldset class="label mb-8 p-4 border border-1 border-gray-700 rounded-md">
      <legend class="px-3">Field Map</legend>
      {#if config.map?.length}
      {#each config.map as map, i}
      <div class="flex justify-start mb-8">
        <label class="label text-sm" for="config-map-property" title="The property name by which this value will be accessed (e.g. `url`, `job_title`, etc.)">
          <span class="block mb-2">Property name</span>
          <input id="config-map-property" name="map[{i}].property"
            type="text" placeholder="property" class="input rounded-md"
            spellcheck="false" autocomplete="off"
            bind:value={config.map[i].property} />
        </label>
  
        <label class="label text-sm ml-4" for="config-map-selector" title="The CSS/JSON selector by which the value can be found in the source document (e.g. `.some-class` (CSS), `root.nested.property` (JSON))">
          <span class="block mb-2">Element selector</span>
          <input id="config-map-selector" name="map[{i}].selector"
            type="text" placeholder=".element-selector" class="input rounded-md"
            spellcheck="false" autocomplete="off"
            bind:value={config.map[i].selector} />
        </label>

        <label class="label ml-4 mb-8 hidden" for="config-map-type">
          <span class="block mb-2">Selector Type</span>
          <select id="config-map-type" name="map[{i}].type" class="select py-4"
            bind:value={config.map[i].type}>
            <option value="string">Text</option>
            <option value="number">Number</option>
          </select>
        </label>
        <div class="relative top-8 ml-4" >
          <Button on:click={() => handleDeleteMap(i)} size="sm">
            <Chollocon name="trash" size="20" />
          </Button>
        </div>
      </div>
      {/each}
      {:else}
      <p class="pt-0 pb-4 text-gray-500">No mapping configured.</p>
      {/if}
      <div class="flex justify-end pt-8">
        <Button title="Add mapping" on:click={handleAddMapping} />
      </div>
    </fieldset>

    <label class="label mb-8 cursor-pointer" for="config-js">
      <span class="block mb-2">Enable JavaScript?</span>
      <input id="config-js" name="js" type="checkbox" class="input rounded-md" />
    </label>

    <!-- <Button type="submit" title="Save format" /> -->
    <button type="submit" title="Save format" class="btn rounded-md variant-filled-primary">Save config</button>
  </form>
</section>