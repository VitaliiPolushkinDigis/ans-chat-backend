import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Session, User } from 'src/utils/typeorm';
import { getRepository } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';

export class WebSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const sessionRepository = getRepository(Session);

    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: [
          'http://localhost:3000',
          'https://front-react-359f97dc238f.herokuapp.com',
        ],
        credentials: true,
        optionsSuccessStatus: 200,
      },
    });
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log('Inside Websocket Adapter');
      const { cookie: clientCookie } = socket.handshake.headers;

      if (!clientCookie) {
        console.log('Client has no cookies');
        return next(new Error('Not Authenticated. No cookies were sent'));
      }
      const { CHAT_APP_SESSION_ID } = cookie.parse(clientCookie);
      if (!CHAT_APP_SESSION_ID) {
        console.log('CHAT_APP_SESSION_ID DOES NOT EXIST');
        return next(new Error('Not Authenticated'));
      }

      const signedCookie = cookieParser.signedCookie(
        CHAT_APP_SESSION_ID,
        'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC' || process.env.COOKIE_SECRET,
      );

      if (!signedCookie) return next(new Error('Error signing cookie'));

      const sessionDB = await sessionRepository.findOne({ id: signedCookie });

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
