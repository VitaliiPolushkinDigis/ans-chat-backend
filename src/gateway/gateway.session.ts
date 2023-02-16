import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/utils/interfaces';

export interface IGatewaySession {
  getSocketId(id: number);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySession {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();
  getSocketId(id: number) {
    return this.sessions.get(id);
  }

  setUserSocket(userId: number, socket: AuthenticatedSocket) {
    this.sessions.set(userId, socket);
  }

  removeUserSocket(userId: number) {
    this.sessions.delete(userId);
  }

  getSockets(): Map<number, AuthenticatedSocket> {
    return this.sessions;
  }
}
