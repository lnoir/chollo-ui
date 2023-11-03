<script lang="ts">
	import { goto } from "$app/navigation";
	import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { listen } from '@tauri-apps/api/event';
	import { onDestroy, onMount } from "svelte";
	import { selectedSource } from "../../../../../stores/app.store";
	import { get } from "svelte/store";
	import type { DocSource, DocSourceRecord } from "../../../../../types";

  let drawerStore = getDrawerStore();
  let source: DocSource | DocSourceRecord = get(selectedSource);
  let unsub: any;

  drawerStore.open({
    id:'format-form',
    position: 'right',
    width: 'w-full md:w-3/4 lg:w-1/2'
  });

  onMount(async () => {
    unsub = await listen('drawer:close', (data: any) => {
      if (data.payload === 'format-form') drawerStore.close();
      goto(`/sources/${source.id}/formats`)
    })
  });

  onDestroy(() => {
    if (unsub !== undefined) unsub();
  });
</script>

<div class="block"></div>