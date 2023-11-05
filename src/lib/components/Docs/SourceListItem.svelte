<script lang="ts">
	import { selectedSource } from "../../../stores/app.store";
	import type { DocSourceRecord } from "../../../types";
	import { showToastSuccess } from "../../helpers";
	import { apiService } from "../../services/api.service";
  import { emit } from '@tauri-apps/api/event';
	import { goto } from "$app/navigation";
	import GenericListItem from "../GenericListItem.svelte";

  export let source: DocSourceRecord;
  
  function clickAction() {
    selectedSource.update(() => source);
  }

  async function deleteAction() {
    await apiService.deleteDocSource(source.id);
    await emit('sources:refresh');
    goto('/sources');
    showToastSuccess('Source removed!');
  }
</script>

<GenericListItem
  icon={source.type}
  selected={$selectedSource?.id === source.id}
  label={source.name}
  href="/sources/{source.id}"
  {deleteAction}
  on:click={clickAction}
/>