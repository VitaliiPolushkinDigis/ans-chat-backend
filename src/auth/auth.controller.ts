import { User } from 'src/utils/typeorm';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserService } from '../users/user';
import { Routes, Services } from '../utils/types';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@ApiTags(Routes.AUTH)
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Ok',
    type: User,
  })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('status')
  /* @UseGuards(AuthenticatedGuard) */
  async status(@Req() req: Request, @Res() res: Response) {
    return res.send(req.user);
  }

  /*   @Post('login')
  loginUser() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {} */
}
