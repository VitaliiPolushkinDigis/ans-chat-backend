"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const typeorm_2 = require("../utils/typeorm");
const types_1 = require("../utils/types");
const conversations_controller_1 = require("./conversations.controller");
const conversations_service_1 = require("./conversations.service");
let ConversationsModule = class ConversationsModule {
};
ConversationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([typeorm_2.Conversation]), users_module_1.UsersModule],
        controllers: [conversations_controller_1.ConversationsController],
        providers: [
            {
                provide: types_1.Services.CONVERSATIONS,
                useClass: conversations_service_1.ConversationsService,
            },
        ],
    })
], ConversationsModule);
exports.ConversationsModule = ConversationsModule;
//# sourceMappingURL=conversations.module.js.map