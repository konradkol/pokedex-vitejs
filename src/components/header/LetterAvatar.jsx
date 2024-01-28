import { Avatar, Stack } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export const LetterAvatar = ({ children }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>{children}</Avatar>
    </Stack>
  );
};
