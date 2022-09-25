import {
  CreateParticipantParams,
  FindParticipantParams,
} from './../utils/types';
import { Participant } from 'src/utils/typeorm';

export interface IParticipantsService {
  findParticipant(params: FindParticipantParams): Promise<Participant | null>;
  createParticipant(params: CreateParticipantParams): Promise<Participant>;
}
