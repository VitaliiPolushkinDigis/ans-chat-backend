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
import { WebSocketAdapter } from './gateway/gateway.adapter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as session from 'express-session';

//
async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blind Talk')
    .setDescription('Blind Talk API description')
    .setVersion('1.0')
    .addTag('dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.enableCors({
    origin: ['https://ans-chat-front.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(new ValidationPipe());

  const sessionRepository = getRepository(Session);
  const adapter = new WebSocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: 'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC' || COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 86400000 * 3, // cookie expires 3 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001, () =>
    console.log(
      `-------App is running on http://localhost:${3001}`,
      process.env.NODE_ENV,
    ),
  );
}
bootstrap();
