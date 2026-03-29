import { Search } from '@mui/icons-material';

import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import type { Theme, SxProps } from '@mui/material/styles';

const sx: SxProps<Theme> = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      bgcolor: 'rgba(255, 255, 255, 0.2)',
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      borderWidth: '1px',
    },
  },
};

export const SearchInput = () => {
  return (
    <Autocomplete
      size="small"
      disablePortal
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={sx}
          label="Search city"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};
