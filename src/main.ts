/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/typeorm';
const passport = require('passport');
import { getRepository } from 'typeorm';
//
async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule, { cors: true });

  const sessionRepository = getRepository(Session);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    require('express-session')({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000 * 3, // cookie expires 3 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () =>
    console.log(`-------App is running on http://localhost:${PORT}`),
  );
}
bootstrap();
