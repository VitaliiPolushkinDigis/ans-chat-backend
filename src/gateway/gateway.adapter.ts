import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Session, User } from 'src/utils/typeorm';
import { getRepository } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';

export class WebSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionsRepository = getRepository(Session);

    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;

      if (!clientCookie) {
        return next(new Error('Not Authenticated!'));
      }
      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
      if (!CHAT_APP_SESSION_ID) {
        return next(
          new Error('CHAT_APP_SESSION_ID does not exists, Not Authenticated!'),
        );
      }

      const signedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC' || process.env.COOKIE_SECRET,
      );

      if (!signedCookie) {
        return next(new Error('Error signing cookie'));
      }

      const sessionDB = await sessionsRepository.findOne({ id: signedCookie });

      if (!sessionDB) return next(new Error('No session found'));

      const userFromJson = JSON.parse(sessionDB.json);

      console.log('userFromJson', userFromJson);

      if (!userFromJson.passport || !userFromJson.passport.user)
        return next(new Error('Passport or User object does not exist.'));

      const userDB = plainToInstance(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );
      socket.user = userDB;
      next();
    });
    return server;
  }
}
// D4 2.12.20
