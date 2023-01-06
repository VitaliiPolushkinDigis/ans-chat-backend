"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Conversation = exports.Session = exports.User = void 0;
const Message_1 = require("./entities/Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return Message_1.Message; } });
const User_1 = require("./entities/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Session_1 = require("./entities/Session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return Session_1.Session; } });
const Conversation_1 = require("./entities/Conversation");
Object.defineProperty(exports, "Conversation", { enumerable: true, get: function () { return Conversation_1.Conversation; } });
const entities = [User_1.User, Session_1.Session, Conversation_1.Conversation, Message_1.Message];
exports.default = entities;
//# sourceMappingURL=index.js.map