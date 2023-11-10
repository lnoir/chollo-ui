<script lang="ts">
	import { get } from "svelte/store";
	import type { TaskOutputJson, TaskOutputResult } from "../../../types";
	import { selectedTask } from "../../../stores/app.store";
	import { createEventDispatcher, onMount } from "svelte";

  export let json: TaskOutputJson;

  let url = '';

  const task = get(selectedTask);
  const dispatch = createEventDispatcher();
  
  onMount(() => {
    if (task?.source.location && json.metadata?.source) {
      url = task.source.location + json.metadata.source
    }
  });

  function getBadgeClass(result: TaskOutputResult) {
    switch (result.confidence) {
      case 'low':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  }
</script>

<li class="list mb-8">
  {#if url}
    <a href="{url}" class="anchor" target="_blank" on:click|preventDefault={() => dispatch('web:open', url)}>
      {json.metadata.title}
    </a>
  {:else}
    <span>{json.metadata.title}</span>
  {/if}
  <p>{json.metadata.content}</p>
  <!-- {#if json.metadata.result || json.metadata.preview} -->
  <!-- {@const result = json.metdata.result || json.metadata.preview} -->
  <!--<span class="badge {getBadgeClass(result)}"></span> -->
  <!-- {/if} -->
</li>
