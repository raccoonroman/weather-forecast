import { Box, Typography } from '@mui/material';
import logo from '@/assets/logo.svg';

interface IProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: IProps) => {
  return (
    <Box sx={{ p: 2, pb: 1.5 }}>
      <Typography
        variant="h1"
        sx={{ display: 'flex', alignItems: 'center', img: { mr: 2 } }}
      >
        <img width={32} height={32} src={logo} alt="logo" />
        {children}
      </Typography>
    </Box>
  );
};
