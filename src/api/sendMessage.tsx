import { Conversation } from '../types/conversation';
import getConversationById from './getConversationById';
import { getLoggedUserId } from './getLoggedUserId';

const sendMessage = ({
  message,
  conversationId,
  conversation,
}: {
  message: string;
  conversationId: string | string[];
  conversation: Conversation[];
}) => {
  const authorId = getLoggedUserId();
  const messageObj = {
    conversationId,
    timestamp: Date.now(),
    authorId,
    body: message,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageObj),
  };
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${conversationId}`,
    requestOptions
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then((json) => [...conversation, json])
    .catch((err) => err.statusText);
};

export default sendMessage;
