<!-- @TODO: need to reorganise the compoments (maybe: atoms, molecules, organisms?) -->
<script lang="ts">
	import type { GenericHandlerFn } from "../../types";
	import { openDialog, showToastError } from "../helpers";
	import ButtonDelete from "./Buttons/ButtonDelete.svelte";
	import Chollocon from "./Icons/Chollocon.svelte";

  export let label: string;
  export let icon: any;
  export let href: string;
  export let selected: boolean;
  export let deleteAction: GenericHandlerFn;
  

  function confirmDelete() {
    openDialog({
      type: 'confirm',
      title: `Delete <strong>${label}</strong>?`,
      body: `Are you you want to permanently remove this ${label}?`,
      response: handleConfirm
    });

    async function handleConfirm(proceed: boolean) {
      if (!proceed) return;
      try {
        await deleteAction();
      }
      catch(err) {
        console.error(err);
        showToastError(`There was a problem while trying delete ${label}...`);
      }
    }
  }
</script>

<li class="dark:border-slate-700 rounded-md p-2 mb-2 {selected ? 'dark:bg-gray-800' : ''}">
  <a {href} title="View {label}" class="flex group relative">
    <div class="flex flex-col justify-center max-w-sm">
      <Chollocon name={icon} size="20" />
    </div>
    <span class="flex flex-col justify-center">{label}</span>
    <!-- @TODO: Add edit button? -->
    <div class="absolute hidden group-hover:block right-0">
      <div class="flex flex-col justify-center">
        <ButtonDelete title="Delete" class=" group-hover:visible"
          on:click={confirmDelete} />
      </div>
    </div>
  </a>
</li>