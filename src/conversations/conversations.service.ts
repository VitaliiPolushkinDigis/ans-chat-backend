import { IUserService } from 'src/users/user';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateConversationParams } from './../utils/types';
import { IConversationsService } from './conversations';

import { IParticipantsService } from 'src/participants/participants';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ) {
    const userDB = await this.userService.findUser({ id: user.id });
    if (!userDB.participant) {
      const newParticipant = await this.participantsService.createParticipant({
        id: conversationParams.authorId,
      });

      userDB.participant = newParticipant;

      await this.userService.saveUser(userDB);
    }
    const recipient = await this.participantsService.findParticipant({
      id: conversationParams.recepientId,
    });
  }
}
