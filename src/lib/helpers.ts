import type { DrawerStore, ModalStore, ToastStore } from '@skeletonlabs/skeleton';
import type { AppDialogOptions, AppMessageOptions, DocSourceRecord } from '../types';
import { selectedSource } from '../stores/app.store';
import { get } from 'svelte/store';

/**
 * Displays stated component in a modal
 *
 * @param modalStore ModalStore
 * @param component string Name of the component (must be registered in modal regitry)
 * @returns
 */
export function showModal(modalStore: ModalStore, options: AppDialogOptions) {
	modalStore.trigger(options);
	return modalStore;
}

export function showToast(toastStore: ToastStore, options: AppMessageOptions) {
	toastStore.trigger(options);
	return toastStore;
}

const toastStyles = `h-12 opacity-80`

export function showToastInfo(toastStore: ToastStore, message: string, title?: string) {
	return showToast(toastStore, {message, title, level:'info', background: 'variant-filled-primary', classes: toastStyles});
}

export function showToastSuccess(toastStore: ToastStore, message: string, title?: string) {
	return showToast(toastStore, {message, title, level:'success', background: 'variant-filled-success', classes: toastStyles});
}

export function showToastWarning(toastStore: ToastStore, message: string, title?: string) {
	return showToast(toastStore, {message, title, level: 'warn', background: 'variant-filled-warning', classes: toastStyles});
}

export function showToastError(toastStore: ToastStore, message: string, title?: string) {
	return showToast(toastStore, {message, title, level: 'error', background: 'variant-filled-error', classes: toastStyles});
}


export function showDrawer(drawerStore: DrawerStore, id: string) {
	drawerStore.open({
		id,
		position: 'right',
		width: 'w-full md:w-3/4 lg:w-1/2'
	});
}

export function setSourceSelectedEmpty() {
	selectedSource.update(() => ({
		id: 0,
		type: 'web',
		name: '',
		location: '',
		created: ''
	}));
}

export function getSelectedSource(): DocSourceRecord {
	const source = get(selectedSource);
	return source;
}