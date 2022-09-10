import { IUserService } from './user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  createUser() {}
}
