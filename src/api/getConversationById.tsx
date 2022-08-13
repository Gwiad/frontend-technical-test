import getLoggedUserConversations from './getLoggedUserConversations';

const getConversationById = async (
  apiUrl: string,
  conversationId: string | string[]
) => {
  const userConversations = await getLoggedUserConversations(apiUrl);
  return userConversations.find(
    (conversation) => conversation.id === parseInt(conversationId as string)
  );
};

export default getConversationById;
