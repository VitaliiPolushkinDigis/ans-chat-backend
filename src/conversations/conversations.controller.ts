import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { Routes } from 'src/utils/types';
import { AuthenticatedGuard } from './../auth/utils/Guards';
import { Services } from './../utils/types';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dtos/CreateConversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: ConversationsService,
  ) {}
  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    this.conversationsService.createConversation(user, createConversationDto);
  }
}
