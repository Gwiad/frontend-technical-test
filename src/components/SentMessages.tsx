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
      <div
        style={{
          width: '100%',
          height: '80vh',
          overflowY: 'scroll',
        }}
      >
        {data?.map((message) => (
          <div key={message.id}>
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
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default SentMessages;
