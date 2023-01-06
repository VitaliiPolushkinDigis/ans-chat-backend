import { compareHash } from '../utils/helpers';
import { IUserService } from '../users/user';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services, ValidateUserDetails } from '../utils/types';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({ email: userDetails.email });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const isPasswordValid = compareHash(userDetails.password, user.password);
    return isPasswordValid ? user : null;
  }
}
