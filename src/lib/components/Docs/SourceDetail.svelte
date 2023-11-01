<script lang="ts">
	import type { DocSource } from "../../../types";

	export let source: DocSource;
</script>

<div class="p-4">
	<h1 class="text-2xl mb-4">Doc Source Details</h1>
	<p>Name: {source.name}</p>
	<p>Type: {source.type}</p>
</div>