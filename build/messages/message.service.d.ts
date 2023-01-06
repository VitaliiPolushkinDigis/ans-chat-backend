import { CreateMessageParams } from './../utils/types';
import { IMessageService } from './message';
import { Message, Conversation } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
export declare class MessageService implements IMessageService {
    private readonly messageRepository;
    private readonly conversationRepository;
    constructor(messageRepository: Repository<Message>, conversationRepository: Repository<Conversation>);
    createMessage({ user, content, conversationId, }: CreateMessageParams): Promise<Message>;
    getMessagesByConversationId(conversationId: number): Promise<Message[]>;
}
