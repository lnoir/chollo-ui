<script lang="ts">
	import { goto } from "$app/navigation";
	import { get } from "svelte/store";
	import Button from "../../../../lib/components/Buttons/Button.svelte";
	import { selectedSource } from "../../../../stores/app.store";
	import type { DocSourceRecord } from "../../../../types";
	import ButtonClose from "../../../../lib/components/Buttons/ButtonClose.svelte";
	import FormatList from "../../../../lib/components/Docs/FormatList.svelte";

  let source: DocSourceRecord = get(selectedSource);
</script>

<div class="dark:bg-gray-700/60 p-6 rounded-md">
  <ButtonClose on:click={() => goto(`/sources/${source.id}`)} />
  <h2 class="text-2xl">Formats</h2>
  {#if source}
  <div class="flex my-8">
    <Button size="sm" on:click={() => goto(`/sources/${source.id}/formats/create`)}>
      Add Format
    </Button>
  </div>
  {#if source.formats}
    <FormatList formats={source.formats} />
  {/if}
  {/if}
</div>