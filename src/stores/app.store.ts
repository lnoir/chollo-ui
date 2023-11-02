import { writable, type Writable } from 'svelte/store';
import type {
	AppDialogOptions,
	AppMessageOptions,
	AppModalOptions,
	DocSourceRecord,
} from '../types';

const defaultHost = 'http://127.0.0.1:38440';

export const cholloHost: Writable<string> = writable(defaultHost);
export const toastQueue: Writable<AppModalOptions[]> = writable([]);
export const dialogQueue: Writable<AppModalOptions[]> = writable([]);
export const loading: Writable<boolean> = writable(false);
export const activeModals = writable({});
export const dbReady = writable(false);
export const selectedSource = writable<DocSourceRecord>();

export const pushMessage = (data: AppMessageOptions) => {
	pushModalItem(data);
};

export const pushDialog = (data: AppDialogOptions) => {
	pushModalItem(data);
};

export const pushModalItem = (
	data: AppDialogOptions | AppMessageOptions
) => {
	let queue;
	switch (data.type) {
		case 'component':
		case 'confirm':
		case 'prompt':
			queue = dialogQueue;
			break;
		default:
			queue = toastQueue;
	}
	queue.update((items) => {
		items.push(data);
		return items;
	});
};