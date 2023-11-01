<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';

	import { Modal, initializeStores, type ModalComponent, Toast, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { dialogQueue, toastQueue } from '../stores/app.store';
	import { showModal, showToast } from '$lib/helpers';
	import type { AppDialogOptions, AppMessageOptions } from '../types';
	import NavBar from '../lib/components/NavBar.svelte';

	let showMenu = true;
	let showSettings = false;

	const modalRegistry: Record<string, ModalComponent> = {
		// settings: { ref: Settings }
	};

	initializeStores();

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	onMount(async () => {
		toastQueue.subscribe((messages) => {
			if (!messages.length) return;
      const data = messages.shift();
			if (data) {
		  	showToast(toastStore, data as AppMessageOptions);
      }
			return messages;
		});
		dialogQueue.subscribe((dialogs) => {
			if (!dialogs) return;
			const data = dialogs.shift();
			if (data) {
			  showModal(modalStore, data as AppDialogOptions);
      }
			return dialogs;
		});
	});
</script>

<Toast />
<Modal components={modalRegistry} width="w-modal" transitionIn={fade} transitionOut={fade} />

<div class="fixed h-full w-full top-0 left-0 p-0 m-9=0 pointer-events-none">
	<div class="flex flex-col h-full w-full justify-center">
		<span class="text-3xl m-auto text-slate-300 dark:text-slate-700">Chollo</span>
	</div>
</div>

<NavBar />

<div class="p-0 pt-16 overflow-auto h-screen">
	<slot />
</div>
