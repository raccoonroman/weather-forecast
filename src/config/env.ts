function getEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const ENV = {
  API_BASE_URL: getEnv('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
  WEATHER_API_KEY: getEnv(
    'VITE_WEATHER_API_KEY',
    import.meta.env.VITE_WEATHER_API_KEY,
  ),
};
