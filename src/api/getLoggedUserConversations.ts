import { getLoggedUserId } from './getLoggedUserId';

const getLoggedUserConversations = (apiUrl: string) => {
  const userId = getLoggedUserId();
  return fetch(`${apiUrl}/${userId}`).then((response) => response.json());
};

export default getLoggedUserConversations;

export const getLoggedUserConversationsIds = () => [1, 2, 3];
