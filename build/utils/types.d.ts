import { User } from 'src/utils/typeorm';
export declare enum Routes {
    AUTH = "auth",
    USERS = "users",
    CONVERSATIONS = "conversations",
    MESSAGES = "messages"
}
export declare enum Services {
    AUTH = "AUTH_SERVICES",
    USERS = "USERS_SERVICES",
    CONVERSATIONS = "CONVERSATIONS",
    MESSAGES = "MESSAGES_SERVICE"
}
export declare type CreateUserDetails = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
export declare type ValidateUserDetails = {
    email: string;
    password: string;
};
export declare type FindUserParams = Partial<{
    id: number;
    email: string;
}>;
export declare type CreateConversationParams = {
    recipientId: number;
    message: string;
};
export declare type ConversationIdentityType = 'author' | 'recipient';
export declare type FindParticipantParams = Partial<{
    id: number;
}>;
export interface AuthenticatedRequest extends Request {
    user: User;
}
export declare type CreateParticipantParams = {
    id: number;
};
export declare type CreateMessageParams = {
    content: string;
    conversationId: number;
    user: User;
};
