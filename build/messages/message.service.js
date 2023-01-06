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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("../utils/typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let MessageService = class MessageService {
    constructor(messageRepository, conversationRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
    }
    async createMessage({ user, content, conversationId, }) {
        const conversation = await this.conversationRepository.findOne({
            where: { id: conversationId },
            relations: ['creator', 'recipient'],
        });
        if (!conversation)
            throw new common_1.HttpException('Convers not found!!!', common_1.HttpStatus.BAD_REQUEST);
        const { creator, recipient } = conversation;
        if (creator.id !== user.id && recipient.id !== user.id)
            throw new common_1.HttpException('Cannot Create Message', common_1.HttpStatus.FORBIDDEN);
        const newMessage = this.messageRepository.create({
            content,
            conversation,
            author: (0, class_transformer_1.instanceToPlain)(user),
        });
        const savedMessage = await this.messageRepository.save(newMessage);
        conversation.lastMessageSent = savedMessage;
        await this.conversationRepository.save(conversation);
        return savedMessage;
    }
    getMessagesByConversationId(conversationId) {
        return this.messageRepository.find({
            relations: ['author'],
            where: { conversation: { id: conversationId } },
            order: { createdAt: 'DESC' },
        });
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(typeorm_1.Message)),
    __param(1, (0, typeorm_2.InjectRepository)(typeorm_1.Conversation)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map