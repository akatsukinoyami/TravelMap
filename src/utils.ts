import type { Mark } from './types.js';

export default function utilsConstructor(markersJson: any) {
  const markers = markersJson as unknown as Record<string, Mark[]>;
  const categories = Object.keys(markers);

  return {
    awoo: true,
    createToggles(): Record<string, boolean> {
      const fromStorage = localStorage.getItem('toggles');

      let toggles = categories.reduce((acc, val) => ({...acc, [val]: true}), {});

      try {
        if(fromStorage) toggles = { ...toggles, ...JSON.parse(fromStorage) };
      } catch {}

      return toggles;
    },
    formatMarkers(toggles: Record<string, boolean>): Record<string, any>[] {
      return categories
        .map(category => (toggles[category] ? markers[category] : []))
        .flat()
    }
  }
}