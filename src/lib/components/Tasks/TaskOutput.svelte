<script lang="ts">
	import { goto } from "$app/navigation";
	import { APP_EVENTS } from "../../../constants";
	import { activeOutput } from "../../../stores/app.store";
	import ButtonClose from "../Buttons/ButtonClose.svelte";
  import { emit } from "@tauri-apps/api/event";
	import TaskJsonDefault from "./TaskOutputJsonDefault.svelte";

  function close() {
    const newPath = window.location.pathname.replace(/\/logs\/\d+$/, '');
    emit(APP_EVENTS.DIALOG_CLOSE);
    goto(newPath);
  }
</script>

<div class="bg-slate-800 overflow-y-auto p-4 m-4 md:p-10 md:m-10 max-w-4xl">
  <ButtonClose on:click={close} />

  {#if $activeOutput}
  {#each $activeOutput as output}
    {#if output.json}
    <TaskJsonDefault json={output.json} />
    {:else}
    {output.text}
    {/if}
  {/each}
  {/if}
</div>