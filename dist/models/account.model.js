"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    gender: String,
    dateBirth: String,
    phone: String,
    password: String,
    tokenUser: String,
    avatar: String,
    linkFb: String,
    thumbnail: String,
    role_id: String,
    status: {
        type: String,
        default: 'active',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const AccountModel = mongoose_1.default.model('UserModel', userSchema, 'user');
exports.default = AccountModel;
