<script lang="ts">
	let docSources: any[] = [];
	let docFormats: any[] = [];
	let selectedDocSource: any;
	let selectedDocFormat: any; // Fetch logic here to populate docSources and docFormats
</script>

<section class="p-4">
	<h1 class="text-2xl mb-4">Create/Edit Task</h1>
	<form>
		<div class="mb-4">
			<label class="block text-sm" for="doc-select">Doc Source:</label>
			<select id="doc-source-select" bind:value={selectedDocSource}>
				{#each docSources as docSource}
					<option value={docSource.id}>{docSource.name}</option>
				{/each}
			</select>
		</div>
		<div class="mb-4">
			<label class="block text-sm" for="doc-format-select">Doc Format:</label>
			<select id="doc-format-select" bind:value={selectedDocFormat}>
				{#each docFormats as docFormat}
					<option value={docFormat.id}>{docFormat.name}</option>
				{/each}
			</select>
		</div>
		<!-- Additional form fields like datetime picker for scheduling tasks -->
		<button type="submit" class="bg-blue-500 text-white p-2 mt-4">Save</button>
	</form>
</section>
