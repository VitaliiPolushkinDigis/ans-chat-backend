import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { Routes, UserParams } from '../utils/types';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { Services } from '../utils/types';
import { IUserService } from './user';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.USERS)
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(
    @Inject(Services.USERS)
    private readonly usersService: IUserService,
  ) {}

  // @Post()
  // async createConversation(
  //   @AuthUser() user: User,
  //   @Body() createConversationDto: CreateConversationDto,
  // ) {
  //   return this.conversationsService.createConversation(
  //     user,
  //     createConversationDto,
  //   );
  // }

  @Get()
  async getUsers(
    @AuthUser() { id }: User,
    @Body() { search }: { search?: string },
  ) {
    if (id) {
      return instanceToPlain(await this.usersService.searchUsers(search));
    }
  }

  @Get('search')
  async findUsers(@AuthUser() user: User, @Body() params: UserParams) {
    if (user.id) {
      return instanceToPlain(await this.usersService.findUsers(params));
    }
    return '';
  }
  // @Get()
  // async getConversations(@AuthUser() { id }: User) {
  //   return this.conversationsService.getConversations(id);
  // }

  // @Get(':id')
  // async getConversationById(@Param('id') id: number) {
  //   const conversation = await this.conversationsService.findConversationById(
  //     id,
  //   );
  //   return conversation;
  // }
}
