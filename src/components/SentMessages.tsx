import { Grid } from '@mui/material';
import { getLoggedUserId } from '../api/getLoggedUserId';
import { Message as MessageT } from '../types/message';
import Message from './Message';
import PageLayout from './PageLayout';

const SentMessages = ({
  data,
  dataStatus,
  otherUserNickname,
}: {
  data?: MessageT[];
  dataStatus?: 'error' | 'loading' | 'empty' | 'success';
  otherUserNickname: string;
}) => {
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

export default SentMessages;
