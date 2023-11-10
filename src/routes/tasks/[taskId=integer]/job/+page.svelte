<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { apiService } from "../../../../lib/services/api.service";

  let job: any;

  afterNavigate(async ({to}) => {
    if (!to?.params?.taskId) return;
    job = await apiService.getTaskJob(Number(to.params.taskId));
  });
</script>

<pre>{JSON.stringify(job) || 'No job found'}</pre>