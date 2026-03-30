import './App.css';
import { Box, Container, Divider, useTheme } from '@mui/material';

import sky from '@/assets/sky-1920.jpg';
import { SearchAutocomplete } from './components/SearchAutocomplete';
import { WeatherResult } from './components/WeatherResult';
import { PageTitle } from './components/PageTitle';
// import WeatherWidget from './components/Widget';
import { useState } from 'react';
import type { CityOption } from './interfaces';

export const HomePage = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  return (
    <Box
      sx={{
        backgroundImage: `url(${sky})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        pt: '10vh',
        pb: 5,
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Box
          component="section"
          sx={{
            width: 1,
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(5px)',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <PageTitle>Weather Forecast</PageTitle>
          <Divider />
          <Box sx={{ p: 2, pt: 3 }}>
            <SearchAutocomplete onSelectCity={setSelectedCity} />
            <WeatherResult city={selectedCity} />
          </Box>
        </Box>
        {/* <WeatherWidget /> */}
      </Container>
    </Box>
  );
};
