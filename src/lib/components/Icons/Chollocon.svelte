<script lang="ts">
  import { onMount } from 'svelte';
	import { appHost } from '../../../stores/app.store';

  type IconAlias = 'www' | 'web' | 'device' | 'drive' | 'x' | 'close' | 'copy';
  
  export let name: IconAlias;
  export let strokeWidth = 2;
  export let strokeColor = 'currentColor';
  export let size = '24';

  let svgEl: SVGElement;
  let icon: IconAlias = 'www';

  const iconAliases = {
    'www': 'www',
    'web': 'www',
    'device': 'device',
    'drive': 'device',
    'x': 'x',
    'close': 'x',
    'copy': 'copy'
  };

  onMount(async () => {
    setIconFilename();
    if (!icon) return;
    await setupIconElement();
  });

  function setIconFilename() {
    icon = iconAliases[name] as IconAlias;
  }

  async function setupIconElement() {
    const url = new URL(`/icons/${icon}.svg`, appHost);
    const res = await fetch(url.href);
    const content = await res.text();
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = content;
    svgEl = tempDiv.firstChild as SVGElement;
    updateStrokeAttributes(svgEl);
    tempDiv.innerHTML = '';
  }

  // Update stroke attributes on the SVG element
  function updateStrokeAttributes(element: SVGElement) {
    const items = element.querySelectorAll('[stroke-width], [stroke]');
    items.forEach((item) => {
      const currentStrokeWidth = item.getAttribute('stroke-width');
      const currentStroke = item.getAttribute('stroke');
      
      if ((currentStrokeWidth !== 'none' && currentStrokeWidth !== '0')) {
        item.setAttribute('stroke-width', strokeWidth.toString());
      }
      if ((currentStroke !== 'none' && currentStroke !== '0')) {
        item.setAttribute('stroke', strokeColor);
      }
    });
  }
</script>

<div class="chollocon-container" style={`width: ${size}px; height: ${size}px;`}>
  {@html svgEl?.outerHTML || ''}
</div>

<style>
  :global(.chollocon-container svg) {
    width: 100%;
    height: 100%;
  }
</style>