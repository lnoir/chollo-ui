<script lang="ts">
	import { selectedSource } from "../../../stores/app.store";
	import SourceTypeIcon from "../Icons/SourceTypeIcon.svelte";
	import { get } from "svelte/store";

  export let source: any;

  function handleClick() {
    selectedSource.update(() => source); // @TODO: remove
  }
</script>

<li class="dark:border-slate-700 rounded-md p-2 mb-2 {get(selectedSource)?.id === source.id ? 'dark:bg-gray-800' : ''}">
  <a href="/sources/{source.id}"
    on:click={handleClick}>
    <div class="flex">
      <SourceTypeIcon name={source.type} pixels={20} />
    </div>
    <div>
      <span class="block">{source.name}</span>
      <!-- Add edit and delete buttons here -->
    </div>
  </a>
</li>