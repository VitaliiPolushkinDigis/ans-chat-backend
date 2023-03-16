import { User } from '../utils/typeorm';
import {
  CreateUserDetails,
  FindUserParams,
  UserParams,
} from './../utils/types';
export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
  findUsers(findUsersParams: UserParams): Promise<User[]>;
  saveUser(user: User): Promise<User>;
  searchUsers(search?: string): Promise<User[]>;
}
