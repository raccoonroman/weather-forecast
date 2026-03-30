import { buildUrl } from '@/config/api';
import { fetchClient } from './fetchClient';

export type CityDto = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export const weatherApi = {
  async searchCities(query: string): Promise<CityDto[]> {
    return fetchClient(buildUrl('/search.json', { q: query }));
  },

  async getForecast(city: string) {
    return fetchClient(buildUrl('/forecast.json', { q: city }));
  },
};
