import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Autocomplete } from '@mui/material';

export const StopSearch = (props) => {
  const autocomplete = useSelector(
    (state) => state.stopResults.autocompleteResults
  );
  const [stop, setstop] = React.useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete
        inputValue={stop}
        onInputChange={(event, newValue) => {
          props.onSearch(stop, true);
          setstop(newValue);
        }}
        sx={{ width: 320 }}
        size="small"
        freeSolo
        options={autocomplete}
        getOptionLabel={(option) => option.stop_name}
        renderInput={(params) => <TextField {...params} label="Stop" />}
        filterOptions={(x) => x}
      />
      <Button
        sx={{ mx: 1, py: 1 }}
        variant="contained"
        disableElevation
        onClick={() => props.onSearch(stop, false)}
      >
        Search
      </Button>
    </Box>
  );
};

StopSearch.propTypes = {
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};
