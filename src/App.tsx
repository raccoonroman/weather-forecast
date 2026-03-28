import './App.css';
import { Box, Container, Divider, useTheme } from '@mui/material';

import sky from '@/assets/sky-1.jpg';

import { SearchInput } from './components/search-input';
import { WeatherResult } from './components/weather-result';
import { PageTitle } from './components/page-title';

function App() {
  const theme = useTheme();

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
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          <PageTitle>Weather Forecast</PageTitle>
          <Divider />
          <Box sx={{ p: 2, pt: 3 }}>
            <SearchInput />
            <WeatherResult />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
