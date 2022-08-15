import { Grid } from '@mui/material';
import useSWR, { useSWRConfig } from 'swr';
import getMessagesByConversationId from '../api/getMessages';
import sendMessage from '../api/sendMessage';
import { loggedUserId } from '../pages/_app';
import { Conversation } from '../types/conversation';
import MessageInput from './MessageInput';
import SentMessages from './SentMessages';

const Messages = ({
  conversationId,
  conversation,
}: {
  conversationId: string | string[];
  conversation: Conversation[];
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
  const { mutate } = useSWRConfig();

  const mutateMessageList = (message) => {
    const options = {
      optimisticData: [
        ...data,
        {
          authorId: loggedUserId,
          body: message,
          conversationId,
          timestamp: Date.now(),
        },
      ],
      rollbackOnError: true,
    };
    mutate(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${conversationId}`,
      sendMessage({ message, conversationId, conversation }),
      options
    );
  };

  const otherUserNickname =
    data?.recipientId === loggedUserId
      ? data?.senderNickname
      : data?.recipientNickname;

  return (
    <>
      <Grid item sx={{ height: '80vh' }} xs={12}>
        <SentMessages
          data={data}
          dataStatus={dataStatus}
          otherUserNickname={otherUserNickname}
        />
      </Grid>
      <Grid item xs={12}>
        <MessageInput mutateMessageList={mutateMessageList} />
      </Grid>
    </>
  );
};

export default Messages;
