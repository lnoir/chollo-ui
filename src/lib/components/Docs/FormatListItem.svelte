<script lang="ts">
	import type { DocFormatRecord } from "../../../types";

  export let format: DocFormatRecord;
</script>


<li class="dark:border-slate-700 rounded-md p-2 mb-2">
  <span class="font-mono text-sm text-gray-500 pr-2">{format.type}</span>{format.name}
</li>
  