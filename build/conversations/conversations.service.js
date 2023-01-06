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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
const types_1 = require("../utils/types");
const typeorm_3 = require("typeorm");
let ConversationsService = class ConversationsService {
    constructor(conversationRepository, userService) {
        this.conversationRepository = conversationRepository;
        this.userService = userService;
    }
    async getConversations(id) {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoin('conversation.creator', 'creator')
            .addSelect([
            'creator.id',
            'creator.firstName',
            'creator.lastName',
            'creator.email',
        ])
            .leftJoin('conversation.recipient', 'recipient')
            .addSelect([
            'recipient.id',
            'recipient.firstName',
            'recipient.lastName',
            'recipient.email',
        ])
            .where('creator.id = :id', { id })
            .orWhere('recipient.id = :id', { id })
            .orderBy('conversation.id', 'DESC')
            .getMany();
    }
    async findConversationById(id) {
        return this.conversationRepository.findOne(id, {
            relations: ['creator', 'recipient', 'messages', 'messages.author'],
        });
    }
    async createConversation(user, conversationParams) {
        const { recipientId } = conversationParams;
        if (user.id === conversationParams.recipientId)
            throw new common_1.HttpException('Cannot Create Conversation', common_1.HttpStatus.BAD_REQUEST);
        const existingConversation = await this.conversationRepository.findOne({
            where: [
                {
                    creator: { id: user.id },
                    recipient: { id: recipientId },
                },
                {
                    creator: { id: recipientId },
                    recipient: { id: user.id },
                },
            ],
        });
        if (existingConversation)
            throw new common_1.HttpException('Conversation exists', common_1.HttpStatus.CONFLICT);
        const recipient = await this.userService.findUser({
            id: recipientId,
        });
        if (!recipient)
            throw new common_1.HttpException('Recipient not found', common_1.HttpStatus.BAD_REQUEST);
        const conversation = this.conversationRepository.create({
            creator: user,
            recipient: recipient,
        });
        return this.conversationRepository.save(conversation);
    }
};
ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Conversation)),
    __param(1, (0, common_1.Inject)(types_1.Services.USERS)),
    __metadata("design:paramtypes", [typeorm_3.Repository, Object])
], ConversationsService);
exports.ConversationsService = ConversationsService;
//# sourceMappingURL=conversations.service.js.map