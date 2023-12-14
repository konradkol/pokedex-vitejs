/* eslint-disable react/prop-types */
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export const LetterAvatar = ({ children }) => {
  return (
    <Stack direction="row" spacing={2}>
      {/* <Avatar>H</Avatar> */}
      {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
      <Avatar sx={{ bgcolor: deepPurple[500] }}>{children}</Avatar>
    </Stack>
  );
};
