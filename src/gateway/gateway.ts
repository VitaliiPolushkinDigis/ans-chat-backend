import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { Services } from 'src/utils/constants';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Message } from 'src/utils/typeorm';
import { IGatewaySessionManager } from './gateway.session';

@WebSocketGateway({
  cors: {
    origin: [
      'https://ans-chat-front.vercel.app/',
      'https://ans-chat-front.vercel.app',
      'https://ans-chat-front.vercel.app:3000',
      'https://ans-chat-front.vercel.app:8000',
      'ans-chat-front.vercel.app:3000',
      'ans-chat-front.vercel.app:8000',
      'http://localhost:3000',
    ],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION)
    private readonly sessions: IGatewaySessionManager,
  ) {}
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    console.log('New Incoming Connection');
    this.sessions.setUserSocketId(socket.user.id, socket);
    socket.emit('connected', { status: 'good' });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }
  @OnEvent('message.create')
  handleMessageCreateEvent(payload: Message) {
    console.log('Inside message.create');
    const {
      author,
      conversation: { creator, recipient },
    } = payload;

    const authorSocket = this.sessions.getUserSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.sessions.getUserSocket(recipient.id)
        : this.sessions.getUserSocket(creator.id);
    if (recipientSocket) {
      recipientSocket.emit('onMessage', payload);
    }

    if (authorSocket) {
      authorSocket.emit('onMessage', payload);
    }
  }
}
