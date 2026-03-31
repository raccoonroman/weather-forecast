import { Box, CircularProgress, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

import type { CityOption } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@/api/weatherApi';

interface IProps {
  city: CityOption | null;
}

export const WeatherResult = ({ city }: IProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['forecast', city?.lat, city?.lon],
    queryFn: () => weatherApi.getForecast(`${city!.lat},${city!.lon}`),
    enabled: !!city,
    select: (data) => ({
      localTime: data.location.localtime,
      conditionText: data.current.condition.text,
      icon: data.current.condition.icon,
      temperature: data.current.temp_c,
      windSpeed: data.current.wind_kph,
      minTemp: data.forecast.forecastday[0].day.mintemp_c,
      maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    }),
  });

  if (!city) {
    return null;
  }

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h4">
        {city.name}, {city.country}
      </Typography>

      {isLoading || !data ? (
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
            {data.localTime}
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
              <img src={data.icon} width={64} height={64} alt={data.conditionText} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, lineHeight: 1, sup: { fontSize: '0.5em' } }}
              >
                {data.temperature}
                <sup>°C</sup>
              </Typography>
              <Typography variant="h4" sx={{ maxWidth: 160 }}>
                {data.conditionText}
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
              Min: {data.minTemp}
              <sup>°C</sup>, Max: {data.maxTemp}
              <sup>°C</sup>
            </Typography>
            <Typography variant="body1">Wind: {data.windSpeed} km/h</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
