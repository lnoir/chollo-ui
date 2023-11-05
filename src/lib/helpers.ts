import type { DrawerStore, ModalStore, ToastStore } from '@skeletonlabs/skeleton';
import type { AppDialogOptions, AppToastOptions, DocFormatRecord, DocSourceRecord } from '../types';
import { pushMessage, selectedFormat, selectedSource } from '../stores/app.store';
import { get } from 'svelte/store';
import { emit } from '@tauri-apps/api/event';
import { APP_EVENTS } from '../constants';

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

export function showToast(toastStore: ToastStore, options: AppToastOptions) {
	toastStore.trigger(options);
	return toastStore;
}

const toastStyles = `h-12 opacity-80`

export function showToastInfo(message: string, title?: string) {
	pushMessage({message, title, type:'info', background: 'variant-filled-primary', classes: toastStyles});
}

export function showToastSuccess(message: string, title?: string) {
	pushMessage({message, title, type:'success', background: 'variant-filled-success', classes: toastStyles});
}

export function showToastWarning(message: string, title?: string) {
	pushMessage({message, title, type: 'warn', background: 'variant-filled-warning', classes: toastStyles});
}

export function showToastError(message: string, title?: string) {
	pushMessage({message, title, type: 'error', background: 'variant-filled-error', classes: toastStyles});
}

/**
 * @Deprecated
 */
export function showDrawer(drawerStore: DrawerStore, id: string) {
	drawerStore.open({
		id,
		position: 'right',
		width: 'w-full md:w-3/4 lg:w-1/2'
	});
}

export function setSelectedSourceEmpty() {
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

export function setSelectedFormatEmpty() {
	selectedFormat.update(() => ({
		id: 0,
		type: 'html',
		name: '',
		location: '',
		created: ''
	}));
}

export function getSelectedFormat(): DocFormatRecord {
	const format = get(selectedFormat);
	return format;
}

export function openDrawer(id: string) {
	emit(APP_EVENTS.DRAWER_OPEN, id);
}

export function openDialog(data: AppDialogOptions) {
	emit(APP_EVENTS.DIALOG_OPEN, data);
}

export function formatDate(d: string | Date) {
	const date = typeof d === 'string' ? new Date(d) : d;
	return date.toISOString().split('T')[0];
}

export function formatTime(d: string | Date) {
	const opts = {
		hour12: false,
		hour: "2-digit",
		minute: "numeric"
	} as Intl.DateTimeFormatOptions;
	const date = typeof d === 'string' ? new Date(d) : d; 
	const formatted = new Intl.DateTimeFormat('en-GB', opts).format(date);
	return formatted;
}