import { createTheme } from '@mui/material/styles';

export let theme = createTheme();

theme = createTheme({
  typography: {
    h1: {
      fontSize: '36px',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
      },
    },
    h4: {
      fontSize: '20px',
      fontWeight: '600',
    },
  },
  palette: {
    divider: 'rgba(255, 255, 255, 0.2)',
  },
});
