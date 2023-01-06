import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDetails, FindUserParams } from './../utils/types';
import { IUserService } from './user';
export declare class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDetails: CreateUserDetails): Promise<User>;
    findUser(findUserParams: FindUserParams): Promise<User>;
    saveUser(user: User): Promise<User>;
}
