<script lang="ts">
	let tasks: any = []; // Populate this from API using fetch
  // Fetch logic here to populate tasks
</script>

<div class="p-4">
	<h1 class="text-2xl mb-4">Tasks</h1>
	<ul>
		{#each tasks as task}
			<li class="border p-2 mb-2">Task ID: {task.id} <!-- Add edit and delete buttons here --></li>
		{/each}
	</ul>
</div>
