import { buildUrl } from '@/config/api';
import { fetchClient } from './fetchClient';
import type { CityDto, WeatherDto } from '@/interfaces';

export const weatherApi = {
  async searchCities(query: string): Promise<CityDto[]> {
    return fetchClient(buildUrl('/search.json', { q: query }));
  },

  async getForecast(query: string): Promise<WeatherDto> {
    return fetchClient(buildUrl('/forecast.json', { q: query }));
  },
};
