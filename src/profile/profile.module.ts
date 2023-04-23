import { Services } from 'src/utils/constants';
import { Profile } from './../utils/typeorm/entities/Profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [
    {
      provide: Services.PROFILE_SERVICE,
      useClass: ProfileService,
    },
  ],
  exports: [
    {
      provide: Services.PROFILE_SERVICE,
      useClass: ProfileService,
    },
  ],
})
export class ProfileModule {}
