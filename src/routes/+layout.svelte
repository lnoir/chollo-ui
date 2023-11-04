<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';

	import { Modal, initializeStores, type ModalComponent, Toast, getModalStore, getToastStore, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { dialogQueue, drawerQueue, toastQueue } from '../stores/app.store';
	import { setSourceSelectedEmpty, showModal, showToast } from '$lib/helpers';
	import type { AppDialogOptions, AppToastOptions } from '../types';
	import NavBar from '../lib/components/NavBar.svelte';
	import FormatForm from '../lib/components/Docs/FormatForm.svelte';
	import TaskForm from '../lib/components/Tasks/TaskForm.svelte';
	import SourceForm from '../lib/components/Docs/SourceForm.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { APP_EVENTS } from '../constants';
	import { listen } from '@tauri-apps/api/event';

	
	const modalRegistry: Record<string, ModalComponent> = {
		// settings: { ref: Settings }
	};

	initializeStores();

	let modalStore = getModalStore();
	let toastStore = getToastStore();
	let drawerStore = getDrawerStore();

	onMount(async () => {
		toastQueue.subscribe((messages) => {
			if (!messages.length) return;
      const data = messages.shift();
			if (data) {
		  	showToast(toastStore, data as AppToastOptions);
				toastQueue.update(() => messages);
      }
		});
		dialogQueue.subscribe((dialogs) => {
			if (!dialogs) return;
			const data = dialogs.shift();
			if (data) {
			  showModal(modalStore, data as AppDialogOptions);
				dialogQueue.update(() => dialogs);
      }
		});
		drawerQueue.subscribe((ids) => {
			if (!ids) return;
			const id = ids.shift();
			if (id) {
			  drawerStore.open({
					id,
					position: 'right',
    			width: 'w-full md:w-3/4 lg:w-1/2'
				});
				drawerQueue.update(() => ids);
      }
		});

		listen(APP_EVENTS.DRAWER_CLOSE, (data: any) => {
			drawerStore.close();
			if (data.payload.redirect) {
				goto(data.payload.redirect);
			}
		});
	});

	beforeNavigate(({to}) => {
		if (!to?.url) return;
		if (!/^\/sources\/\d+/ig.test(to.url.pathname)) {
			setSourceSelectedEmpty();
		}
	});
</script>

<Drawer>
	{#if $drawerStore.id === 'format-form'}
	<FormatForm />
	{:else if $drawerStore.id === 'task-form'}
	<TaskForm />
	{:else if $drawerStore.id === 'source-form'}
	<SourceForm />
	{/if}
</Drawer>

<Toast />
<Modal components={modalRegistry} width="w-modal" transitionIn={fade} transitionOut={fade} />

<div class="fixed h-full w-full top-0 left-0 p-0 m-9=0 pointer-events-none -z-10">
	<div class="flex flex-col h-full w-full justify-center">
		<span class="text-3xl m-auto text-slate-300 dark:text-slate-700/60">Chollo</span>
	</div>
</div>

<NavBar />

<div class="p-0 pt-8 overflow-auto h-screen">
	<slot />
</div>
