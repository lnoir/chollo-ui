<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	let sourceId: number;

	afterNavigate(({ to }) => {
		sourceId = Number(to?.params?.docSourceId);
	});
</script>

DocSource page...