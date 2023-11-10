<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	
	let logs: any = [];
	let taskId: number;
	let activeFilter = 'all';
	let filteredList = [];
	$: {
		filteredList = logs.filter(log => activeFilter === 'all' || log.status === activeFilter);
		console.log({activeFilter, filteredList, logs})
	}

	afterNavigate(async () => {
		({ logs, taskId } = data);
	});
</script>

<section class="bg-gray-800 h-full rounded-md overflow-auto">
	{#if logs?.length}
	<select name="status-filter" class="select mb-4" bind:value={activeFilter}>
		<option value="all">All</option>
		<option value="completed">Completed</option>
		<option value="failed">Failed</option>
  </select>
	{#each filteredList as log}
		{@const chip = log.status === 'failed' ? 'error' : 'success'}
		{@const date = log.start.split('T')}
		<a href="/tasks/{taskId}/logs/{log.job}" class="mb-2 text-sm">
			<p>
				<span class="">{date[0]} {date[1].split('.')[0]}</span>
				<span class="badge variant-soft-{chip}">{log.status}</span>
				<span class="text-slate-300 font-bold">{log.source}: {log.format}</span>
			</p>
			{#if log.message}
			<pre class="block px-2 py-1 mono text-xs dark:bg-slate-900/50">{log.message}</pre>
			{/if}
		</a>

	{/each}
  <div class="child-route p-4">
    <slot />
  </div>
	{/if}
</section>