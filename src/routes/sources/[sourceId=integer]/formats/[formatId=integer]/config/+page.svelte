<script lang="ts">
	import { DRAWER_IDS } from "../../../../../../constants";
	import { selectedFormat } from "../../../../../../stores/app.store";
	import { apiService } from "../../../../../../lib/services/api.service";
	import { afterNavigate } from "$app/navigation";
	import { openDrawer } from "../../../../../../lib/helpers";
  
  afterNavigate(async ({to}) => {
    if (!to?.params) return;
    const format = await apiService.getDocFormat(to?.params?.formatId);
    selectedFormat.update(() => format);
    openDrawer(DRAWER_IDS.CONFIG_FORM);
  });
</script>