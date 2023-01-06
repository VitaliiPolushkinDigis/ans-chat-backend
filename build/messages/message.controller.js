"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const typeorm_1 = require("../utils/typeorm");
const CreateMessage_dto_1 = require("./dtos/CreateMessage.dto");
const message_service_1 = require("./message.service");
const types_1 = require("../utils/types");
const common_1 = require("@nestjs/common");
const decorators_1 = require("../utils/decorators");
const event_emitter_1 = require("@nestjs/event-emitter");
let MessageController = class MessageController {
    constructor(messageService, eventEmitter) {
        this.messageService = messageService;
        this.eventEmitter = eventEmitter;
    }
    async createMessage(user, createMessageDto) {
        const msg = await this.messageService.createMessage(Object.assign(Object.assign({}, createMessageDto), { user }));
        this.eventEmitter.emit('message.create', msg);
        return;
    }
    async getMessagesFromConversation(user, conversationId) {
        const messages = await this.messageService.getMessagesByConversationId(conversationId);
        return { id: conversationId, messages };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User,
        CreateMessage_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)(':conversationId'),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Param)('conversationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User, Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesFromConversation", null);
MessageController = __decorate([
    (0, common_1.Controller)(types_1.Routes.MESSAGES),
    __param(0, (0, common_1.Inject)(types_1.Services.MESSAGES)),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        event_emitter_1.EventEmitter2])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map