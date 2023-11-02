<script lang="ts">
	import Chollocon from '../Icons/Chollocon.svelte';

	type Position = 'top' | 'bottom';

	export let text: string;
	export let title: string = 'Copy this text';
	export let position: Position = 'top';

	function copyToClipboard() {
		navigator.clipboard.writeText(text);
	}
</script>

<button
	class="btn variant-ghost absolute right-0 z-20"
	{title}
	class:top-5={position === 'top'}
	class:bottom-5={position !== 'top'}
	on:click={copyToClipboard}>
	<Chollocon name="copy" />
</button>
