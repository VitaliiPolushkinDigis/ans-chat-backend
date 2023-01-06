import { Message } from './Message';
import { User } from './User';
export declare class Conversation {
    id: number;
    creator: User;
    recipient: User;
    messages: Message;
    createdAt: Date;
    lastMessageSent: Message;
}
