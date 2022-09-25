import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from './../utils/types';
export interface IConversationsService {
  createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ): Promise<Conversation | void>;
}
