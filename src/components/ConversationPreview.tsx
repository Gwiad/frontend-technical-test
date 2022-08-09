import { Conversation } from '../types/conversation';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { stringToColor } from '../utils/stringToColor';
import Moment from 'react-moment';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import Link from 'next/link';

const ConversationPreview = (props: Conversation) => {
  const userId = getLoggedUserId();
  const {
    id,
    lastMessageTimestamp,
    recipientId,
    recipientNickname,
    senderId,
    senderNickname,
  } = props;
  const avatarDetails =
    recipientId === userId
      ? {
          id: senderId,
          nickname: senderNickname,
          letter: senderNickname.split('')[0],
        }
      : {
          id: recipientId,
          nickname: recipientNickname,
          letter: recipientNickname.split('')[0],
        };
  return (
    <Link href={`/conversation/${id}`}>
      <Card
        sx={{
          height: '80px',
          border: '1px solid lightgrey',
          margin: '10px',
          borderRadius: '20px',
        }}
      >
        <CardContent
          sx={{
            padding: '12px 24px',
          }}
        >
          <Grid container direction='row' alignItems='center' spacing={5}>
            <Grid item>
              <Avatar
                alt={avatarDetails.nickname}
                sx={{
                  bgcolor: stringToColor(avatarDetails.nickname),
                }}
              >
                {avatarDetails.letter}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant='h6'>{avatarDetails.nickname}</Typography>
              <Typography variant='subtitle2' color='gray'>
                <Moment unix format='MMMM YY'>
                  {lastMessageTimestamp}
                </Moment>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConversationPreview;
