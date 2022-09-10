import { Module } from '@nestjs/common';
import { Services } from 'src/utils/types';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
