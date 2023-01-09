/* eslint-disable @typescript-eslint/no-var-requires */
// import { configure as serverlessExpress } from '@vendia/serverless-express';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { getRepository } from 'typeorm';
// import { Session } from './utils/typeorm';
// import { ValidationPipe } from '@nestjs/common';
// import { TypeormStore } from 'connect-typeorm/out';

// const passport = require('passport');

// let cachedServer;

// export const handler = async (event, context) => {
//   if (!cachedServer) {
//     const { COOKIE_SECRET } = process.env;
//     const nestApp = await NestFactory.create(AppModule);
//     const sessionRepository = getRepository(Session);
//     nestApp.setGlobalPrefix('api');
//     nestApp.enableCors({
//       origin: ['http://localhost:3000'],
//       credentials: true,
//     });
//     nestApp.useGlobalPipes(new ValidationPipe());

//     nestApp.use(
//       require('express-session')({
//         secret: 'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC',
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//           maxAge: 86400000 * 3, // cookie expires 3 day later
//         },
//         store: new TypeormStore().connect(sessionRepository),
//       }),
//     );

//     nestApp.use(passport.initialize());
//     nestApp.use(passport.session());

//     await nestApp.init();
//     cachedServer = serverlessExpress({
//       app: nestApp.getHttpAdapter().getInstance(),
//     });
//   }

//   return cachedServer(event, context);
// };

import { getRepository } from 'typeorm';
// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
// import * as session from 'express-session';
// import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const passport = require('passport');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const { COOKIE_SECRET } = process.env;
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { cors: true },
    );
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      preflightContinue: true,
    });
    nestApp.use(eventContext());

    const sessionRepository = getRepository(Session);

    nestApp.setGlobalPrefix('api');

    nestApp.useGlobalPipes(new ValidationPipe());

    nestApp.use(
      require('express-session')({
        secret: 'LASJDLA3123LSDFSDF78SDFS5DFMHJ123CCC',
        saveUninitialized: false,
        resave: false,
        cookie: {
          maxAge: 86400000 * 3, // cookie expires 3 day later
        },
        store: new TypeormStore().connect(sessionRepository),
      }),
    );

    nestApp.use(passport.initialize());
    nestApp.use(passport.session());

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
