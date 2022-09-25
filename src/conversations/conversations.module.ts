import { UsersModule } from 'src/users/users.module';
import { ParticipantsModule } from './../participants/participants.module';
import { Conversation, Participant } from 'src/utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/types';
import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Participant]),
    ParticipantsModule,
    UsersModule,
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSATIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
