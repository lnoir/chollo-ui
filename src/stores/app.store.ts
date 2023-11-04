import { writable, type Writable } from 'svelte/store';
import type {
	AppDialogOptions,
	AppToastOptions,
	AppModalOptions,
	DocSourceRecord,
} from '../types';

const apiHost = 'http://127.0.0.1:38440';

export const cholloHost: Writable<string> = writable(apiHost);
export const toastQueue: Writable<AppModalOptions[]> = writable([]);
export const dialogQueue: Writable<AppModalOptions[]> = writable([]);
export const drawerQueue: Writable<string[]> = writable([]);
export const loading: Writable<boolean> = writable(false);
export const activeModals = writable({});
export const dbReady = writable(false);
export const selectedSource = writable<DocSourceRecord>();

export const pushMessage = (data: AppToastOptions) => {
	updateQueue<AppToastOptions>(toastQueue, data);
};

export const pushDialog = (data: AppDialogOptions) => {
	updateQueue<AppDialogOptions>(dialogQueue, data);
};

export const pushDrawer = (id: string) => {
	updateQueue<string>(drawerQueue, id);
}

function updateQueue<D>(queue: Writable<any>, data: D) {
	queue.update(items => {
		items.push(data);
		return items
	});	
}