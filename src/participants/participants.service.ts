import {
  CreateParticipantParams,
  FindParticipantParams,
} from './../utils/types';
import { Participant } from './../utils/typeorm/entities/Participant';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IParticipantsService } from './participants';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}
  findParticipant(params: FindParticipantParams): Promise<Participant | null> {
    return this.participantRepository.findOne(params);
  }
  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }
}
