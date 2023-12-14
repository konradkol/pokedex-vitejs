/* eslint-disable react/prop-types */
// import React from 'react';
// import * as React from 'react';
// import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { mixed } from 'yup';

export const Paginations = ({ page, setPage, countPages }) => {
  // const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          display: 'flex',
          // width: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
          // bgcolor: 'background.default',
          color: 'text.primary',
          // borderRadius: 1,
          pt: 3,
        }}
        color="primary"
      >
        Page: {page}
      </Typography>
      {/* <Pagination count={10} /> */}
      <Pagination
        count={countPages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        color="primary"
        // variant="outlined"
        shape="rounded"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 2,
        }}
      />
      {/* <Pagination count={10} color="secondary" /> */}
      {/* <Pagination count={10} disabled /> */}
    </Stack>
  );
};
