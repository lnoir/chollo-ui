<script lang="ts">
	import { afterUpdate } from "svelte";

  type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
  type ButtonProminance = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  type ButtonVariant = 'filled' | 'ghost' | 'ringed';
  type ButtonPresets = ButtonProminance | 'none';
  type ButtonType = 'button' | 'submit' | 'reset';

  export let variant: ButtonVariant = 'ghost';
  export let prominance: ButtonProminance = 'secondary';
  export let size: ButtonSize = 'md';
  export let title = '';
  export let type: ButtonType = 'button';
  export let round = false;

  let buttonVariant = '';

  afterUpdate(() => {
    buttonVariant = `variant-${variant}-${prominance}`;
  });
</script>

<button {type} {title} class="btn btn-{size} {buttonVariant}"
  class:rounded-full={round}
  class:rounded-md={!round}
  on:click
  {...$$restProps}>
  <slot>
    {title}
  </slot>
</button>