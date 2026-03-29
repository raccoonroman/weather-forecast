import { ENV } from './env';

export function buildUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${ENV.API_BASE_URL}${path}`);

  url.searchParams.set('key', ENV.WEATHER_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
