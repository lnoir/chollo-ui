<script lang="ts">
	import type { DocSource, DocSourceRecord } from "../../../types";
	import Button from "../Buttons/Button.svelte";
	import SourceTypeIcon from "../Icons/SourceTypeIcon.svelte";
	import { goto } from "$app/navigation";
	import ButtonClose from "../Buttons/ButtonClose.svelte";

	export let source: DocSource | DocSourceRecord;

  function close() {
    goto(`/sources`);
  }

  function toggleFormats() {
    const path = window.location.pathname.includes('/formats')
      ? `/sources/${source.id}`
      : `/sources/${source.id}/formats`;
    goto(path);
  }
</script>

{#if source}
<div class="p-4">

  <ButtonClose filled={true} on:click={close} />

  <div class="inline-block mr-2">
    <SourceTypeIcon />    
  </div>
  <h1 class="text-2xl mb-4 inline-block">
    {source.name} 
  </h1>
	<p class="text-slate-500">{source.location}</p>

  
  <div class="flex mt-8">
    <Button size="sm" on:click={toggleFormats}>
      Formats
    </Button>
  </div>
</div>
{/if}