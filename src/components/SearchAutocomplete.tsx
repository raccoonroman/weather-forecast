import { weatherApi, type CityDto } from '@/api/weatherApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import type { CityOption } from '@/interfaces';
import { Delete } from '@mui/icons-material';

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  type AutocompleteChangeReason,
  type AutocompleteInputChangeReason,
  type SnackbarCloseReason,
} from '@mui/material';
import type { Theme, SxProps } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useState, type SyntheticEvent } from 'react';

const sx: SxProps<Theme> = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      bgcolor: 'rgba(255, 255, 255, 0.1)',
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

interface IProps {
  onSelectCity: React.Dispatch<React.SetStateAction<CityOption | null>>;
}

export const SearchAutocomplete = ({ onSelectCity }: IProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 400);
  const [historyOptions, setHistoryOptions] = useLocalStorageState<CityOption[]>(
    'searchHistory',
    [],
  );
  const [deletedCities, setDeletedCities] = useState<CityOption[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading } = useQuery<CityDto[], Error, CityOption[]>({
    queryKey: ['cities', debouncedInputValue],
    queryFn: () => weatherApi.searchCities(debouncedInputValue),
    enabled: !!debouncedInputValue.trim(),
    select: (cities) =>
      cities.map((city) => ({
        id: city.id,
        name: city.name,
        region: city.region,
        country: city.country,
        fromHistory: false,
      })),
  });
  const options = debouncedInputValue.trim() ? (data ?? []) : historyOptions;
  const hasHistoryOptions = historyOptions.length > 0;
  const shouldOpenDropdown =
    isAutocompleteOpen && (debouncedInputValue.trim().length > 0 || options.length > 0);

  const onInputChange = (
    _: SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    switch (reason) {
      case 'clear':
        setInputValue('');
        setIsAutocompleteOpen(hasHistoryOptions);
        return;
      case 'input':
        setInputValue(value);
        setIsAutocompleteOpen(value.trim().length > 0 || hasHistoryOptions);
        return;
      default:
        return;
    }
  };

  const onChange = (
    _: SyntheticEvent,
    value: CityOption | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (reason !== 'selectOption' || !value) {
      return;
    }

    setHistoryOptions((prev) => {
      return [{ ...value, fromHistory: true }, ...prev.filter((c) => c.id !== value.id)].slice(
        0,
        10,
      );
    });
    onSelectCity(value);
    setInputValue('');
    setIsAutocompleteOpen(false);
  };

  const onRemoveHistoryOption = (option: CityOption) => (event: SyntheticEvent) => {
    event.stopPropagation();
    setHistoryOptions((prev) => prev.filter((c) => c.id !== option.id));
    setDeletedCities((prev) => [...prev, option]);
    setSnackbarOpen(true);
  };

  const onUndoClick = () => {
    setHistoryOptions((prev) => [...deletedCities, ...prev]);
    setSnackbarOpen(false);
  };

  const onSnackbarClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSnackbarExited = () => {
    setDeletedCities([]);
  };

  return (
    <>
      <Autocomplete<CityOption, false, false, false>
        size="small"
        open={shouldOpenDropdown}
        options={options}
        loading={isLoading}
        filterOptions={(x) => x}
        getOptionLabel={(option) =>
          `${option.name}, ${option.region ? option.region + ', ' : ''}${option.country}`
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        inputValue={inputValue}
        value={null}
        onOpen={() => setIsAutocompleteOpen(true)}
        onClose={() => setIsAutocompleteOpen(false)}
        onInputChange={onInputChange}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={sx}
            label="Search city"
            onBlur={() => setIsAutocompleteOpen(false)}
          />
        )}
        renderOption={(props, option) => {
          return (
            <Box
              component="li"
              {...props}
              key={option.id}
              sx={{ '&&': { display: 'flex', justifyContent: 'space-between' } }}
            >
              {option.name}, {option.region ? option.region + ', ' : ''}
              {option.country}
              {option.fromHistory && (
                <IconButton size="small" edge="end" onClick={onRemoveHistoryOption(option)}>
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>
          );
        }}
      />
      <Snackbar
        open={snackbarOpen}
        onClose={onSnackbarClose}
        slotProps={{
          transition: {
            onExited: onSnackbarExited,
          },
        }}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={`${deletedCities.length} cit${deletedCities.length > 1 ? 'ies' : 'y'} removed`}
        action={
          <Button color="primary" size="small" onClick={onUndoClick}>
            UNDO
          </Button>
        }
      />
    </>
  );
};
