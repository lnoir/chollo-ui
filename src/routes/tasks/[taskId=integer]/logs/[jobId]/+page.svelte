<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { showModal } from '../../../../../lib/helpers';
	import { activeOutput } from '../../../../../stores/app.store';
	import type { PageData } from './$types';

	export let data: PageData;
	
	let output: any;
  let taskId: number;

	afterNavigate(async () => {
		output = data.output;
    activeOutput.update(() => output);
    showModal({
      type: 'component',
      component: 'task-output',
      meta: output
    });
	});
</script>