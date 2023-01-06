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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const Message_1 = require("./Message");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Conversation = class Conversation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Conversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Conversation.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Conversation.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.conversation, {
        cascade: ['insert', 'remove', 'update'],
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Message_1.Message)
], Conversation.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Conversation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Message_1.Message),
    (0, typeorm_1.JoinColumn)({ name: 'last_message_sent' }),
    __metadata("design:type", Message_1.Message)
], Conversation.prototype, "lastMessageSent", void 0);
Conversation = __decorate([
    (0, typeorm_1.Entity)({ name: 'conversations' }),
    (0, typeorm_1.Index)(['creator.id', 'recipient.id'], { unique: true })
], Conversation);
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map