import { Request, Response } from 'express';
import { IUserService } from 'src/users/user';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: IAuthService, userService: IUserService);
    registerUser(createUserDto: CreateUserDto): Promise<Record<string, any>>;
    login(): void;
    status(req: Request, res: Response): void;
}
