export interface Conversation {
  id: number;
  lastMessageTimestamp: Date;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
}
