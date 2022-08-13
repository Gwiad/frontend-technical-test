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
  const dataStatus = error
    ? 'error'
    : !data
    ? 'loading'
    : data.length < 1
    ? 'empty'
    : 'success';
  const loggedUserId = getLoggedUserId();
  return (
    <PageLayout dataTitle='messages' dataStatus={dataStatus}>
      <Grid
        container
        direction='column'
        justifyContent='flex-end'
        column-spacing='8px'
        rowSpacing={2}
        sx={{ height: '80vh' }}
      >
        {data?.map((message) => (
          <Grid item key={message.id}>
            <Message
              variant={
                message.authorId === loggedUserId
                  ? 'current-user'
                  : 'other-user'
              }
              body={message.body}
              authorNickname={
                message.authorId === loggedUserId ? '' : otherUserNickname
              }
            />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default Messages;
