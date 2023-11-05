<script lang="ts">
  import { SvelteComponent, afterUpdate, onMount, tick } from 'svelte';

  const iconAliases = {
    'www': 'www',
    'web': 'www',
    'device': 'device',
    'drive': 'device',
    'x': 'x',
    'close': 'x',
    'copy': 'copy',
    'trash': 'trash',
    'tool': 'tool',
    'arrows': 'arrows-x'
  };
  type IconAlias = keyof typeof iconAliases;
  
  export let name: IconAlias;
  export let strokeWidth = 2;
  export let strokeColor = 'currentColor';
  export let size = '24';

  let svgEl: SVGElement;
  let icon: IconAlias = 'www';
  let target: HTMLDivElement;
  let component: SvelteComponent;


  onMount(async () => {
    setIconFilename();
    if (!icon) return;
    await setupIconElement();
  });

  afterUpdate(async () => {
    if (component) {
      component.$destroy();
      target.innerHTML = '';
      setIconFilename();
      await setupIconElement();
    }
  });

  function setIconFilename() {
    icon = iconAliases[name] as IconAlias;
  }

  async function setupIconElement() {
    const IconComponent = (await import(`./_IconComponents/icon-${icon}.svelte`)).default;
    component = new IconComponent({
      target,
    });
    await tick();
    if (!target?.firstChild) return;
    updateStrokeAttributes(target.firstChild as SVGElement);
  }

  // Update stroke attributes on the SVG element
  function updateStrokeAttributes(element: SVGElement) {
    const items = element.querySelectorAll('[stroke-width], [stroke]');
    items.forEach((item) => {
      const currentStrokeWidth = item.getAttribute('stroke-width');
      const currentStroke = item.getAttribute('stroke');
      maybeUpdateAttributes({item, currentStroke, currentStrokeWidth});
    });
    maybeUpdateAttributes({
      item: element,
      currentStroke: element.getAttribute('stroke'),
      currentStrokeWidth: element.getAttribute('stroke-width')
    });
  }
 
  function maybeUpdateAttributes({item, currentStroke, currentStrokeWidth}: any) {
    if ((currentStrokeWidth !== 'none' && currentStrokeWidth !== '0')) {
      item.setAttribute('stroke-width', strokeWidth.toString());
    }
    if ((currentStroke !== 'none' && currentStroke !== '0')) {
      item.setAttribute('stroke', strokeColor);
    }
  }
</script>

<div class="chollocon-container" style={`width: ${size}px; height: ${size}px;`}
  {...$$restProps}>
  {@html svgEl?.outerHTML || ''}
  <div bind:this={target}></div>
</div>

<style>
  :global(.chollocon-container svg) {
    width: 100%;
    height: 100%;
  }
</style>