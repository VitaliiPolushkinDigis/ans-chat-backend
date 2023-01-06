import { Message } from './entities/Message';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
declare const entities: (typeof User | typeof Message | typeof Conversation | typeof Session)[];
export default entities;
export { User, Session, Conversation, Message };
