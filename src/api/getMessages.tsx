import { getLoggedUserId } from './getLoggedUserId';

const getMessagesByConversationId = (apiUrl: string) =>
  fetch(apiUrl).then((response) => response.json());

export default getMessagesByConversationId;
