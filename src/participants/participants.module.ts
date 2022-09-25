import { Participant } from './../utils/typeorm/entities/Participant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/types';
import { Module } from '@nestjs/common';
import { ParticipantService } from './participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantService,
    },
  ],
  exports: [
    {
      provide: Services.PARTICIPANTS,
      useClass: ParticipantService,
    },
  ],
})
export class ParticipantsModule {}
