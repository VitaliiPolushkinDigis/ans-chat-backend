import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { MessageService } from './message.service';
import { Routes, Services } from 'src/utils/types';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/utils/decorators';

@Controller(Routes.MESSAGES)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: MessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage({ ...createMessageDto, user });
  }

  @Get(':conversationId')
  getMessagesFromConversation(
    @AuthUser() user: User,
    @Param('conversationId') conversationId: number,
  ) {
    return this.messageService.getMessagesByConversationId(conversationId);
  }
}
