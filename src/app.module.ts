import entities from './utils/typeorm/index';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import {ConfigModule} from "@nestjs/config" */
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database-1.c4ffj2rebimq.eu-central-1.rds.amazonaws.com' /* process.env.DB_HOST */,
      /* 'localhost' */ /* 'database-1.chwzotdkgmwi.eu-central-1.rds.amazonaws.com' */ port: 5432,
      username: 'postgres',
      password: '12345678' /*  '12345678' */ /* 123 */ /* '12345678' */,
      database: 'chat',
      entities,
      synchronize: false,
    }),
    ConversationsModule,
    MessagesModule,
    GatewayModule,
    EventEmitterModule.forRoot(),
    ProfileModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
