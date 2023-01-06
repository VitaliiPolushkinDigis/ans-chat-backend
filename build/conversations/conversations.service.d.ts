import { IUserService } from 'src/users/user';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationParams } from './../utils/types';
import { IConversationsService } from './conversations';
export declare class ConversationsService implements IConversationsService {
    private readonly conversationRepository;
    private readonly userService;
    constructor(conversationRepository: Repository<Conversation>, userService: IUserService);
    getConversations(id: number): Promise<Conversation[]>;
    findConversationById(id: number): Promise<Conversation>;
    createConversation(user: User, conversationParams: CreateConversationParams): Promise<Conversation>;
}
