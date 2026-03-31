import { fetchClient } from './fetchClient';
import type { CityDto, WeatherDto } from '@/interfaces';

export const weatherApi = {
  async searchCities(query: string): Promise<CityDto[]> {
    const params = new URLSearchParams({ q: query });
    return fetchClient(`/api/weather/search.json?${params.toString()}`);
  },

  async getForecast(query: string): Promise<WeatherDto> {
    const params = new URLSearchParams({ q: query });
    return fetchClient(`/api/weather/forecast.json?${params.toString()}`);
  },
};
