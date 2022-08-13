import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import useSWR from 'swr';
import getConversationById from '../api/getConversationById';
import { getLoggedUserId } from '../api/getLoggedUserId';
import Messages from './Messages';
import PageLayout from './PageLayout';

const ConversationDetails = ({
  conversationId,
}: {
  conversationId: string | string[];
}) => {
  const loggedUserId = getLoggedUserId();
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`, conversationId],
    getConversationById
  );
  const dataStatus = error
    ? 'error'
    : !data
    ? 'loading'
    : data.length < 1
    ? 'empty'
    : 'success';
  const otherUserNickname =
    data?.recipientId === loggedUserId
      ? data?.senderNickname
      : data?.recipientNickname;
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 600) setIsDesktop(true);
    else setIsDesktop(false);
  }, []);
  return (
    <PageLayout dataTitle='conversation' dataStatus={dataStatus}>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Grid
            container
            sx={{
              height: isDesktop ? '60px' : '30px',
              borderTop: '1px solid black',
              background: 'lightgrey',
            }}
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item xs='auto'>
              <Typography sx={{ fontWeight: 800, padding: '0px 6px' }}>
                {data?.recipientId === loggedUserId
                  ? data?.senderNickname
                  : data?.recipientNickname}{' '}
                - You
              </Typography>
            </Grid>
            {isDesktop && (
              <Grid item xs='auto'>
                <Typography sx={{ fontWeight: 800, padding: '0px 6px' }}>
                  Last message{' '}
                  <Moment unix format='DD MMMM YY'>
                    {data?.lastMessageTimestamp}
                  </Moment>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item sx={{ height: '80vh' }} xs={12}>
          <Messages
            conversationId={conversationId}
            otherUserNickname={otherUserNickname}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </PageLayout>
  );
};

export default ConversationDetails;
