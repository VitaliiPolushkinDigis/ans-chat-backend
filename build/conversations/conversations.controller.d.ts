import { User } from 'src/utils/typeorm';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: IConversationsService);
    createConversation(user: User, createConversationDto: CreateConversationDto): Promise<any>;
    getConversations({ id }: User): Promise<import("src/utils/typeorm").Conversation[]>;
    getConversationById(id: number): Promise<import("src/utils/typeorm").Conversation>;
}
