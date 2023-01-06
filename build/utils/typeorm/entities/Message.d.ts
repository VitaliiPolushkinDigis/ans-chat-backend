import { Conversation } from './Conversation';
import { User } from 'src/utils/typeorm';
export declare class Message {
    id: number;
    content: string;
    createdAt: Date;
    author: User;
    conversation: Conversation;
}
