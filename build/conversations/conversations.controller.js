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
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../utils/decorators");
const typeorm_1 = require("../utils/typeorm");
const types_1 = require("../utils/types");
const Guards_1 = require("./../auth/utils/Guards");
const types_2 = require("./../utils/types");
const CreateConversation_dto_1 = require("./dtos/CreateConversation.dto");
let ConversationsController = class ConversationsController {
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    async createConversation(user, createConversationDto) {
        return this.conversationsService.createConversation(user, createConversationDto);
    }
    async getConversations({ id }) {
        return this.conversationsService.getConversations(id);
    }
    async getConversationById(id) {
        const conversation = await this.conversationsService.findConversationById(id);
        return conversation;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User,
        CreateConversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.User]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getConversationById", null);
ConversationsController = __decorate([
    (0, common_1.Controller)(types_1.Routes.CONVERSATIONS),
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    __param(0, (0, common_1.Inject)(types_2.Services.CONVERSATIONS)),
    __metadata("design:paramtypes", [Object])
], ConversationsController);
exports.ConversationsController = ConversationsController;
//# sourceMappingURL=conversations.controller.js.map