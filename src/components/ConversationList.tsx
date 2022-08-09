import { Typography } from '@mui/material';
import useSWR from 'swr';
import getLoggedUserConversations from '../api/getLoggedUserConversations';
import ConversationPreview from './ConversationPreview';
import PageLayout from './PageLayout';

const ConversationList = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`;
  const { data, error } = useSWR(apiUrl, getLoggedUserConversations);

  if (error)
    return (
      <PageLayout>
        <Typography variant='h6'>could not load conversations...</Typography>
      </PageLayout>
    );
  if (!data)
    return (
      <PageLayout>
        <Typography variant='h6'>loading conversations...</Typography>
      </PageLayout>
    );
  if (data.length < 1)
    return (
      <PageLayout>
        <Typography variant='h6'>no conversations found</Typography>
      </PageLayout>
    );
  return (
    <PageLayout>
      {data.map((conversation) => (
        <ConversationPreview key={conversation.id} {...conversation} />
      ))}
    </PageLayout>
  );
};

export default ConversationList;
