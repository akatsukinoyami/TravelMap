export type Mark = {
  id: string;
  lat: number;
  lng: number;
  object: string;
  city: string;
  comment: string;
  icon: string;
  tags: string[];
  country: string;
}

export type Utils = {
  awoo: true;
  toggles: Record<string, boolean>;
  countries: string[];
  cities: string[];
  coordsByCity: (city: string) => [number, number];
  markers: () => Mark[];
}