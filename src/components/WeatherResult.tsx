import { Box, CircularProgress, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

import type { CityOption } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@/api/weatherApi';

interface IProps {
  city: CityOption | null;
}

export const WeatherResult = ({ city }: IProps) => {
  const {
    data: forecast,
    isPending,
    error,
  } = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => weatherApi.getForecast(city ? `${city.lat},${city.lon}` : 'auto:ip'),
    select: (data) => ({
      location: data.location,
      conditionText: data.current.condition.text,
      icon: data.current.condition.icon,
      temperature: data.current.temp_c,
      windSpeed: data.current.wind_kph,
      minTemp: data.forecast.forecastday[0].day.mintemp_c,
      maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    }),
  });

  if (error) {
    return (
      <Typography variant="body1" color="error" sx={{ mt: 2 }}>
        Failed to load weather data. Please try again.
      </Typography>
    );
  }

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h4">
        {city
          ? `${city.name}, ${city.country}`
          : forecast
            ? `${forecast.location.name}, ${forecast.location.country}`
            : ''}
      </Typography>
      {isPending ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="body2"
            sx={{ pt: 0.5, pb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <AccessTime fontSize="small" />
            {forecast.location.localtime}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              alignItems: 'center',
              justifyContent: 'center',
              py: 1,
              columnGap: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <img src={forecast.icon} width={64} height={64} alt={forecast.conditionText} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, lineHeight: 1, sup: { fontSize: '0.5em' } }}
              >
                {forecast.temperature}
                <sup>&deg;C</sup>
              </Typography>
              <Typography variant="h4" sx={{ maxWidth: 160 }}>
                {forecast.conditionText}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="body1">
              Min: {forecast.minTemp}
              <sup>&deg;C</sup>, Max: {forecast.maxTemp}
              <sup>&deg;C</sup>
            </Typography>
            <Typography variant="body1">Wind: {forecast.windSpeed} km/h</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
