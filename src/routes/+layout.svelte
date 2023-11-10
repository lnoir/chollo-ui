<script lang="ts">
	import { fade } from 'svelte/transition';
	import '../app.css';

	import { Modal, initializeStores, type ModalComponent, Toast, getModalStore, getToastStore, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { dialogQueue, drawerQueue, toastQueue } from '../stores/app.store';
	import { setSelectedFormatEmpty, setSelectedSourceEmpty, showModal, showToast } from '$lib/helpers';
	import type { AppDialogOptions, AppToastOptions } from '../types';
	import NavBar from '../lib/components/NavBar.svelte';
	import FormatForm from '../lib/components/Docs/FormatForm.svelte';
	import TaskForm from '../lib/components/Tasks/TaskForm.svelte';
	import SourceForm from '../lib/components/Docs/SourceForm.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { APP_EVENTS, DRAWER_IDS } from '../constants';
	import { listen } from '@tauri-apps/api/event';
	import ConfigForm from '../lib/components/Docs/ConfigForm.svelte';
	import StepForm from '../lib/components/Tasks/StepForm.svelte';
	import TaskOutput from '../lib/components/Tasks/TaskOutput.svelte';

	
	const modalRegistry: Record<string, ModalComponent> = {
		'task-output': { ref: TaskOutput }
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
		/*await listen(APP_EVENTS.DIALOG_OPEN, (data: any) => {
			showModal(modalStore, data);
		});*/
		await listen(APP_EVENTS.DIALOG_OPEN, (data) => {
			const {title, type, component, meta, body, response}  = data.payload as any;
			console.log(type, component, meta, body, response)
			modalStore.trigger({
				title,
				type,
				component,
				meta,
				body,
				response,
			});
		});
		await listen(APP_EVENTS.DIALOG_CLOSE, () => {
			modalStore.close();
		});
		await listen(APP_EVENTS.DRAWER_OPEN, (data) => {
			const id = data.payload as string;
			drawerStore.open({
				id,
				position: 'right',
				width: 'w-full md:w-3/4 lg:w-1/2',
			});
		});
		await listen(APP_EVENTS.DRAWER_CLOSE, (data: any) => {
			drawerStore.close();
			if (data.payload.redirect) {
				goto(data.payload.redirect);
			}
		});
	});

	beforeNavigate(({to}) => {
		console.log(to?.url.href)
		if (!to?.url) return;
		if (!/\/format\/\d+(.*)?/ig.test(to.url.pathname)) {
			setSelectedFormatEmpty();
		}
		if (!/^\/sources\/\d+/ig.test(to.url.pathname)) {
			setSelectedSourceEmpty();
		}
	});
</script>

<Drawer on:drawer={() => console.log('$id:', $drawerStore.id)} on:backdrop={() => {history.back()}}>
	{#if $drawerStore.id === DRAWER_IDS.FORMAT_FORM}
	<FormatForm />
	{:else if $drawerStore.id === DRAWER_IDS.SOURCE_FORM}
	<SourceForm />
	{:else if $drawerStore.id === DRAWER_IDS.CONFIG_FORM}
	<ConfigForm />
	{:else if $drawerStore.id === DRAWER_IDS.TASK_FORM}
	<TaskForm />
	{:else if $drawerStore.id === DRAWER_IDS.STEP_FORM}
	<StepForm />
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
