<script lang="ts">
	import { afterUpdate } from "svelte";

  type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
  type ButtonProminance = 'primary' | 'secondary' | 'tertiary';
  type ButtonVariant = 'filled' | 'ghost';
  type ButtonPresets = ButtonProminance | 'none';

  export let variant: ButtonVariant = 'ghost';
  export let prominance: ButtonProminance = 'secondary';
  export let size: ButtonSize = 'md';
  export let preset: ButtonPresets  = 'none';
  export let title = '';

  let buttonStyle = '';

  const presets: any = {
    'primary': '',
    'secondary': '',
    'tertiary': ''
  };

  afterUpdate(() => {
    buttonStyle = presets[preset] || `variant-${variant}-${prominance}`;
  });
</script>

<button type="button" class="btn btn-{size} {buttonStyle}" {title} on:click>
  <slot>
    {title}
  </slot>
</button>