
import { get } from 'svelte/store';
import type { LayoutServerLoad } from './$types';
import { cholloHost } from '../../../../stores/app.store';

export const prerender = false;

const host = get(cholloHost);

export const load: LayoutServerLoad = async ({ params, fetch }) => {
	const res = await fetch(`${host}/v1/tasks/scheduled/${params.taskId}/logs`);
  const logs = res.json();
	return {
    logs,
		taskId: params.taskId,
	};
};
