import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const Paginations = ({ page, setPage, countPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'text.primary',
          pt: 3,
        }}
        color="primary"
      >
        Page: {page}
      </Typography>
      <Pagination
        count={countPages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        color="primary"
        shape="rounded"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 4,
        }}
      />
    </Stack>
  );
};
