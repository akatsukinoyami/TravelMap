import { writable, type Writable } from 'svelte/store';
import type { Mark, Utils } from './types.js';

export default function utilsConstructor(markersJson: any): Writable<Utils> {
  const markers = markersJson as Record<string, Mark[]>;
  const markersFlat = Object.entries(markers).map(([country, markers]) => 
    markers.map(marker => ({ ...marker, country }))
  ).flat();
  const categories = markersFlat.map(mark => mark.tags).flat().filter(unique);

  const fromStorage = localStorage.getItem('toggles');

  let toggles = categories.reduce((acc, val) => ({...acc, [val]: true}), {});

  try {
    if(fromStorage) toggles = { ...toggles, ...JSON.parse(fromStorage) };
  } catch {
  } finally {
    return writable<Utils>({
      awoo: true,
      toggles,
      countries: Object.keys(markers),
      cities: markersFlat.map(mark => mark.city).filter(unique).filter(v => v).sort(),

      coordsByCity(city: string): [number, number] {
        const mark = markersFlat.find(mark => mark.city === city);
        if(mark) return [mark.lng, mark.lat];
        return [0, 0];
      },

      markers(): Mark[] {
        const activeCategories = categories
          .map(category => this.toggles[category] ? category : "")
          .filter(val => val);
  
        return markersFlat.filter(
          mark => activeCategories.some(
            category => mark.tags.includes(category)
        ))
      }
    })
  }
}

function unique(v: string, i: number, a: string[]): boolean {
  return a.indexOf(v) === i;
}