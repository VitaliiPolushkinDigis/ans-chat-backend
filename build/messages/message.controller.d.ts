import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { MessageService } from './message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MessageController {
    private readonly messageService;
    private eventEmitter;
    constructor(messageService: MessageService, eventEmitter: EventEmitter2);
    createMessage(user: User, createMessageDto: CreateMessageDto): Promise<void>;
    getMessagesFromConversation(user: User, conversationId: number): Promise<{
        id: number;
        messages: import("src/utils/typeorm").Message[];
    }>;
}
