<script lang="ts">
	import { goto } from "$app/navigation";
	import { selectedFormat } from "../../../stores/app.store";
	import type { DocFormatRecord } from "../../../types";
	import { getSelectedSource } from "../../helpers";
	import Button from "../Buttons/Button.svelte";
	import Chollocon from "../Icons/Chollocon.svelte";

  export let format: DocFormatRecord;
  const source = getSelectedSource();

  async function handleConfigBtnClick() {
    selectedFormat.update(() => format);
    goto(`/sources/${source.id}/formats/${format.id}/config`);
  }
</script>


<li class="dark:border-slate-700 rounded-md p-2 mb-2 flex justify-between">
  <div>
    <span class="font-mono text-sm text-gray-500 pr-2">{format.type}</span>{format.name}
  </div>
  <div>
    <Button size="sm" on:click={handleConfigBtnClick}>
      <Chollocon name="tool" size="18" />
    </Button>
  </div>
</li>
  