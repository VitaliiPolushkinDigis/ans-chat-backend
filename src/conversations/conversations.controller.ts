import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { Routes } from '../utils/types';
import { AuthenticatedGuard } from './../auth/utils/Guards';
import { Services } from './../utils/types';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';

@ApiTags(Routes.CONVERSATIONS)
@Controller(Routes.CONVERSATIONS)
@UseGuards(
  process.env.NODE_ENV === 'production' ? undefined : AuthenticatedGuard,
)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationsService.createConversation(
      user,
      createConversationDto,
    );
  }

  @Get()
  async getConversations(@AuthUser() user: User) {
    if (!user.id) {
      throw new HttpException('Cannot get user id', HttpStatus.BAD_REQUEST);
    }
    return this.conversationsService.getConversations(user.id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    const conversation = await this.conversationsService.findConversationById(
      id,
    );
    return conversation;
  }
}
