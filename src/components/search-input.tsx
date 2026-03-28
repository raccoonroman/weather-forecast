import { Search } from '@mui/icons-material';

import { Autocomplete, InputAdornment, TextField } from '@mui/material';

export const SearchInput = () => {
  return (
    <Autocomplete
      size="small"
      disablePortal
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
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
