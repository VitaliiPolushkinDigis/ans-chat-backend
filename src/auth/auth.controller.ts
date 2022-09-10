import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/types';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  /*   @Post('login')
  loginUser() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {} */
}
