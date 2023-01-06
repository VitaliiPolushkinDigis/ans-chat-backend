import { IUserService } from 'src/users/user';
import { IAuthService } from './auth';
import { ValidateUserDetails } from 'src/utils/types';
export declare class AuthService implements IAuthService {
    private readonly userService;
    constructor(userService: IUserService);
    validateUser(userDetails: ValidateUserDetails): Promise<import("../utils/typeorm").User>;
}
