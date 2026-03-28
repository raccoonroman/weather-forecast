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
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
            borderWidth: '1px',
          },
        },
      },
    },
  },
  palette: {
    divider: 'rgba(255, 255, 255, 0.2)',
  },
});
