import type { Mark } from './types.js';

export type Utils = {
  awoo: true;
  toggles: Record<string, boolean>;
  countries: string[];
  cities: string[];
  coordsByCity: (city: string) => [number, number];
  markers: () => Mark[];
}

export default function utilsConstructor(markersJson: any): Utils {
  const markers = markersJson as unknown as Mark[];
  const categories = markers.map(mark => mark.tags).flat().filter(unique);

  const fromStorage = localStorage.getItem('toggles');

  let toggles = categories.reduce((acc, val) => ({...acc, [val]: true}), {});

  try {
    if(fromStorage) toggles = { ...toggles, ...JSON.parse(fromStorage) };
  } catch {
  } finally {
    return {
      awoo: true,
      toggles,
      countries: markers.map(mark => mark.country).filter(unique).filter(v => v).sort(),
      cities: markers.map(mark => mark.city).filter(unique).filter(v => v).sort(),

      coordsByCity(city: string): [number, number] {
        const mark = markers.find(mark => mark.city === city);
        if(mark) return [mark.lng, mark.lat];
        return [0, 0];
      },

      markers(): Mark[] {
        const activeCategories = categories
          .map(category => this.toggles[category] ? category : "")
          .filter(val => val);
  
        return markers.filter(
          mark => activeCategories.some(
            category => mark.tags.includes(category)
        ))
      }
    }
  }
}

function unique(v: string, i: number, a: string[]): boolean {
  return a.indexOf(v) === i;
}