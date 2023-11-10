<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { DRAWER_IDS } from "../../../../../constants";
	import { openDrawer } from "../../../../../lib/helpers";

  afterNavigate(() => {
    openDrawer(DRAWER_IDS.STEP_FORM);
  });
</script>