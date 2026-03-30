import { Box, Typography } from '@mui/material';

import rainy from '@/assets/rainy.svg';
import sunny from '@/assets/sunny.svg';
import cloudy from '@/assets/cloudy.svg';
import type { CityOption } from '@/interfaces';

interface IProps {
  city: CityOption | null;
}

export const WeatherResult = ({ city }: IProps) => {
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h4">Vinnytsia, Ukraine</Typography>
      <Typography variant="body1" sx={{ pb: 2 }}>
        Tue, 20 Jun
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 4,
          py: 1,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <img src={cloudy} width={100} height={100} alt="Cloudy" />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, lineHeight: 1, sup: { fontSize: '0.5em' } }}
          >
            18<sup>°C</sup>
          </Typography>
          <Typography variant="h4">Cloudy</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" sx={{ mt: 2, display: 'flex' }}>
          {/* <South fontSize="small" sx={{ fontWeight: 700 }} /> */}
          Min: 15 <sup>°C</sup>, {/* <North fontSize="small" sx={{ fontWeight: 700 }} /> */}
          Max: 22 <sup>°C</sup>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, display: 'flex' }}>
          {/* <Air fontSize="small" sx={{ color: '#000', mr: 0.5 }} /> */}
          Wind: 10km/h
        </Typography>
      </Box>
    </Box>
  );
};
