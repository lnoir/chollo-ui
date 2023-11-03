<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { getDrawerStore, type DrawerStore } from "@skeletonlabs/skeleton";
	import { listen } from '@tauri-apps/api/event';
	import { goto } from "$app/navigation";

	let drawerStore: DrawerStore = getDrawerStore();
	drawerStore.open({
		id: 'source-form',
		position: 'right',
		width: 'w-full md:w-3/4 lg:w-1/2'
	});

	let unsub: any;

	onMount(async () => {
		unsub = await listen('drawer:close', data => {
			if (data.payload === 'source-form') drawerStore.close();
			goto(`/sources`);
		});
	});

	onDestroy(() => {
		if (unsub !== undefined) unsub();
	});
</script>