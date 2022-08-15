import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({
  mutateMessageList,
}: {
  mutateMessageList: (message: string) => void;
}) => {
  const [value, updateValue] = useState('');
  return (
    <div
      style={{
        position: 'relative',
        color: 'grey',
        width: '100%',
      }}
    >
      <input
        id='message-input'
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        placeholder='Send message'
        style={{
          border: '1px solid grey',
          borderRadius: '20px',
          width: '100%',
          padding: '10px 40px 10px 10px',
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && value.length > 0) {
            mutateMessageList(value);
            updateValue('');
          }
        }}
      />
      <SendIcon
        sx={{ color: 'grey', position: 'absolute', top: 7, right: 7 }}
        onClick={() => {
          if (value.length > 0) {
            mutateMessageList(value);
            updateValue('');
          }
        }}
      />
    </div>
  );
};

export default MessageInput;
