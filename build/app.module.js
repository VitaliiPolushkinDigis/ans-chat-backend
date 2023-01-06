"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const index_1 = require("./utils/typeorm/index");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const passport_1 = require("@nestjs/passport");
const conversations_module_1 = require("./conversations/conversations.module");
const messages_module_1 = require("./messages/messages.module");
const gateway_module_1 = require("./gateway/gateway.module");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env.development' }),
            passport_1.PassportModule.register({ session: true }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRE_DB_HOST,
                port: 5432,
                username: process.env.POSTGRE_DB_USER,
                password: process.env.POSTGRE_DB_PASSWORD,
                database: process.env.POSTGRE_DB_DATABASE,
                entities: index_1.default,
                synchronize: true,
            }),
            conversations_module_1.ConversationsModule,
            messages_module_1.MessagesModule,
            gateway_module_1.GatewayModule,
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map