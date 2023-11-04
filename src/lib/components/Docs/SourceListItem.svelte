<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import SourceTypeIcon from "../Icons/IconSourceType.svelte";
	import { pushDialog, selectedSource } from "../../../stores/app.store";
	import type { DocSourceRecord } from "../../../types";
	import type { Unsubscriber } from "svelte/store";
	import { showToastError, showToastSuccess } from "../../helpers";
	import ButtonDelete from "../Buttons/ButtonDelete.svelte";
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import { goto } from "$app/navigation";

  export let source: any;
  
  let selected: DocSourceRecord;
  let sub: Unsubscriber;

  onMount(() => {
    sub = selectedSource.subscribe(latest => {
      selected = latest;
    });
  });

  onDestroy(() => {
    sub();
  });
  
  function confirmDelete() {
    pushDialog({
      type: 'confirm',
      title: `Delete <strong>${source.name}</strong>?`,
      body: 'Are you you want to permanently remove this source?',
      response: handleConfirm
    });

    async function handleConfirm(proceed: boolean) {
      if (!proceed) return;
      try {
        await apiService.deleteDocSource(source.id);
        await emit('sources:refresh');
        goto('/sources');
        showToastSuccess('Source removed!');
      }
      catch(err) {
        console.error(err);
        showToastError('There was a problem while trying delete the source...')
      }
    }
  }
</script>

<li class="dark:border-slate-700 rounded-md p-2 mb-2 {selected?.id === source.id ? 'dark:bg-gray-800' : ''}">
  <a href="/sources/{source.id}" title="View {source.name}" class="group">
    <div class="flex">
      <SourceTypeIcon icon={source.type} pixels="20" />
    </div>
    <div class="relative w-full">
      <span class="flex flex-col justify-center">{source.name}</span>
      <!-- Add edit and delete buttons here -->
      <div class="absolute hidden group-hover:block right-0 -top-1.5">
        <ButtonDelete title="Delete" class=" group-hover:visible"
          on:click={confirmDelete} />
      </div>
    </div>
  </a>
</li>