import { Grid, Typography } from '@mui/material';
import { Message } from '../types/message';

const Message = ({
  variant,
  body,
  authorNickname,
}: {
  variant: 'current-user' | 'other-user';
  body: Message['body'];
  authorNickname?: string;
}) => {
  return (
    <Grid
      container
      justifyContent={variant === 'current-user' ? 'flex-end' : 'flex-start'}
    >
      <Grid item>
        <Typography gutterBottom sx={{ color: 'gray' }}>
          {authorNickname}
        </Typography>
        <Typography
          sx={{
            textAlign: 'right',
            padding: '6px 14px',
            borderRadius: '24px',
            width: 'fit-content',
            background: variant === 'current-user' ? '#00B2FF' : 'lightgrey',
            color: variant === 'current-user' ? 'white' : 'black',
          }}
        >
          {body}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Message;
