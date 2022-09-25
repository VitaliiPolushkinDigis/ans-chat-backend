import { IUserService } from 'src/users/user';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User, Participant } from 'src/utils/typeorm';
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

    const { authorId, recepientId } = conversationParams;
    const participants: Participant[] = [];
    if (!userDB.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDB,
        authorId,
      );
      participants.push(participant);
    } else {
      participants.push(userDB.participant);
    }
    const recipient = await this.userService.findUser({
      id: recepientId,
    });

    if (!recipient) {
      throw new HttpException('Recipient not found.', HttpStatus.BAD_REQUEST);
    }

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(
        recipient,
        recepientId,
      );
      participants.push(participant);
    } else {
      participants.push(recipient.participant);
    }

    //create conversation
    const conversation = this.conversationRepository.create({ participants });

    return this.conversationRepository.save(conversation);
  }

  public async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantsService.createParticipant({
      id,
    });

    user.participant = participant;
    await this.userService.saveUser(user);

    return participant;
  }
}
