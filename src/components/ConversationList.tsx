import { Typography } from '@mui/material';
import useSWR from 'swr';
import getLoggedUserConversations from '../api/getLoggedUserConversations';
import ConversationPreview from './ConversationPreview';
import PageLayout from './PageLayout';

const ConversationList = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`;
  const { data, error } = useSWR(apiUrl, getLoggedUserConversations);
  const dataStatus = error
    ? 'error'
    : !data
    ? 'loading'
    : data.length < 1
    ? 'empty'
    : 'success';
  return (
    <PageLayout dataTitle='conversations' dataStatus={dataStatus}>
      {data?.map((conversation) => (
        <ConversationPreview key={conversation.id} {...conversation} />
      ))}
    </PageLayout>
  );
};

export default ConversationList;
