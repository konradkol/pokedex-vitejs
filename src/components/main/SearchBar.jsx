/* eslint-disable react/prop-types */
// import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const SearchBar = ({
  error,
  helperText = 'Wpisz nazwę Pokemona.',
  name,
  setName,
}) => {
  // const [name, setName] = useState('Wpisz nazwę Pokemona');

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',

        '& > :not(style)': {
          m: 1,
          width: 400,
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        error={error}
        id="search"
        label="Search"
        variant="outlined"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        helperText={helperText}
      />
      {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
};
