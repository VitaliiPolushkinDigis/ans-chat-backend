import { Post } from './entities/Post';
import { Message } from './entities/Message';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Profile } from './entities/Profile';
import { Comment } from './entities/Comment';

const entities = [User, Session, Conversation, Message, Profile, Post, Comment];

export default entities;
export { User, Session, Conversation, Message, Profile, Post, Comment };
