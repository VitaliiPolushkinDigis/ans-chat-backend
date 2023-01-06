import { User } from './../utils/typeorm/entities/User';
import { ValidateUserDetails } from '../utils/types';
export interface IAuthService {
  validateUser(userCredentials: ValidateUserDetails): Promise<User | null>;
}
