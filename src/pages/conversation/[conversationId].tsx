import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { getLoggedUserConversationsIds } from '../../api/getLoggedUserConversations';
import ConversationDetails from '../../components/ConversationDetails';
import PageLayout from '../../components/PageLayout';

const ConversationPage = () => {
  const router = useRouter();
  const { conversationId } = router.query;
  const usersConversationsIds = getLoggedUserConversationsIds();
  React.useEffect(() => {
    if (!usersConversationsIds.includes(parseInt(conversationId as string))) {
      router.push('/');
    }
  }, [usersConversationsIds, conversationId, router]);
  return (
    <Grid container alignItems='center' sx={{ height: '100vh' }}>
      <PageLayout>
        <ConversationDetails conversationId={conversationId} />
      </PageLayout>
    </Grid>
  );
};

export default ConversationPage;
