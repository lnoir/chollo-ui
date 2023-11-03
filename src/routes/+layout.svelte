<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';

	import { Modal, initializeStores, type ModalComponent, Toast, getModalStore, getToastStore, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { dialogQueue, selectedSource, toastQueue } from '../stores/app.store';
	import { setSourceSelectedEmpty, showModal, showToast } from '$lib/helpers';
	import type { AppDialogOptions, AppMessageOptions } from '../types';
	import NavBar from '../lib/components/NavBar.svelte';
	import FormatForm from '../lib/components/Docs/FormatForm.svelte';
	import TaskForm from '../lib/components/Tasks/TaskForm.svelte';
	import SourceForm from '../lib/components/Docs/SourceForm.svelte';
	import { beforeNavigate } from '$app/navigation';

	
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
		<span class="text-3xl m-auto text-slate-300 dark:text-slate-700">Chollo</span>
	</div>
</div>

<NavBar />

<div class="p-0 pt-8 overflow-auto h-screen">
	<slot />
</div>
