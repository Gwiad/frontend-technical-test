import { Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { getLoggedUserId } from '../api/getLoggedUserId';
import getMessagesByConversationId from '../api/getMessages';
import Message from './Message';
import PageLayout from './PageLayout';

const Messages = ({
  conversationId,
  otherUserNickname,
}: {
  conversationId: string | string[];
  otherUserNickname: string;
}) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${conversationId}`;
  const { data, error } = useSWR(apiUrl, getMessagesByConversationId);
  console.log(data);
  const loggedUserId = getLoggedUserId();
  if (error)
    return (
      <PageLayout>
        <Typography variant='h6'>could not load messages...</Typography>
      </PageLayout>
    );
  if (!data)
    return (
      <PageLayout>
        <Typography variant='h6'>loading messages...</Typography>
      </PageLayout>
    );
  if (data.length < 1)
    return (
      <PageLayout>
        <Typography variant='h6'>no messages</Typography>
      </PageLayout>
    );
  return (
    <Grid
      container
      direction='column'
      justifyContent='flex-end'
      column-spacing='8px'
      rowSpacing={2}
      sx={{ height: '100%' }}
    >
      {data.map((message) => (
        <Grid item key={message.id}>
          <Message
            variant={
              message.authorId === loggedUserId ? 'current-user' : 'other-user'
            }
            body={message.body}
            authorNickname={
              message.authorId === loggedUserId ? '' : otherUserNickname
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Messages;
