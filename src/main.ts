/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/typeorm';
const passport = require('passport');
const helmet = require('helmet');
import { getRepository } from 'typeorm';
/* import { WebSocketAdapter } from './gateway/gateway.adapter'; */
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

//
async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [
        'http://localhost:3000',
        'https://front-react-359f97dc238f.herokuapp.com',
      ],
      credentials: true,
      optionsSuccessStatus: 200,
    },
  });
  const sessionRepository = getRepository(Session);
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.set('trust proxy', 1);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://front-react-359f97dc238f.herokuapp.com',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC' || COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000 * 3, // cookie expires 3 day later
        sameSite: 'none',
        secure: true,
        httpOnly: false,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Blind Talk')
    .setDescription('Blind Talk API description')
    .setVersion('1.0')
    .addTag('dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* const adapter = new WebSocketAdapter(app);
  app.useWebSocketAdapter(adapter); */

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT || 3000, () =>
    console.log(
      `-------App is running on http://localhost:${PORT || 3000}`,
      process.env.NODE_ENV,
    ),
  );
}
bootstrap();
