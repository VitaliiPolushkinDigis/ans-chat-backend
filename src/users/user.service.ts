import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../utils/typeorm';
import { ILike, Repository } from 'typeorm';
import { hashPassword } from './../utils/helpers';
import {
  CreateUserDetails,
  Filter,
  FindUserParams,
  UserParams,
} from './../utils/types';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      email: userDetails.email,
    });
    if (existingUser) {
      throw new HttpException('User alreate exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOne(findUserParams);
  }

  async findUsers(findUsersParams: UserParams): Promise<User[]> {
    const filters = {};

    if (Object.keys(findUsersParams).length) {
      if (findUsersParams.filters?.length)
        findUsersParams.filters.map((f) => {
          filters[f.label] = f.value;
        });
    }

    return this.userRepository.find({
      where: Object.keys(filters) ? filters : {},
    });
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async searchUsers(search: string): Promise<User[]> {
    return this.userRepository.find(
      search
        ? {
            firstName: ILike(`%${search}%`),
          }
        : {},
    );
  }
}
