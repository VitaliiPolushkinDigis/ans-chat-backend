"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const typeorm_1 = require("typeorm");
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const passport = require("passport");
const out_1 = require("connect-typeorm/out");
const typeorm_2 = require("./utils/typeorm");
const express = require('express');
const binaryMimeTypes = [];
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const { COOKIE_SECRET } = process.env;
        const expressApp = express();
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        const sessionRepository = (0, typeorm_1.getRepository)(typeorm_2.Session);
        nestApp.setGlobalPrefix('api');
        nestApp.enableCors({
            origin: ['http://localhost:3000'],
            credentials: true,
        });
        nestApp.useGlobalPipes(new common_1.ValidationPipe());
        nestApp.use(session({
            secret: COOKIE_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 86400000 * 3,
            },
            store: new out_1.TypeormStore().connect(sessionRepository),
        }));
        nestApp.use(passport.initialize());
        nestApp.use(passport.session());
        nestApp.use((0, middleware_1.eventContext)());
        await nestApp.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map