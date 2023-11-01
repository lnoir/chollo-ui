<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '../../lib/services/api.service';
	import SourceList from '$components/Docs/SourceList.svelte';

  let sources = [];

  onMount(async () => {
    sources = await apiService.getDocSources();
    console.log({sources});
  });
</script>

<SourceList />