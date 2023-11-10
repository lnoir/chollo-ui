
import { get } from 'svelte/store';
import type { LayoutServerLoad } from './$types';
import { cholloHost } from '../../../../../stores/app.store';

export const prerender = false;

const host = get(cholloHost);

export const load: LayoutServerLoad = async ({ params, fetch }) => {
	const res = await fetch(`${host}/v1/tasks/outputs/${params.jobId}`);
  const output = res.json();
	return {
    output,
		taskId: params.taskId,
	};
};
