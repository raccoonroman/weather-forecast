import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const weatherApiBaseUrl = env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';
  const weatherApiKey = env.WEATHER_API_KEY;

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/weather': {
          target: weatherApiBaseUrl,
          changeOrigin: true,
          rewrite: (incomingPath) => {
            const stripped = incomingPath.replace(/^\/api\/weather/, '');
            const [pathname, search = ''] = stripped.split('?');
            const params = new URLSearchParams(search);

            if (weatherApiKey) {
              params.set('key', weatherApiKey);
            }

            const queryString = params.toString();
            return queryString ? `${pathname}?${queryString}` : pathname;
          },
        },
      },
    },
  };
});
