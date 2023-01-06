/// <reference types="node" />
import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
export declare class MessagingGateway implements OnGatewayConnection {
    handleConnection(client: Socket, ...args: any[]): void;
    server: Server;
    handleCreateMessage(data: any): void;
    handleMessageCreateEvent(payload: any): void;
}
