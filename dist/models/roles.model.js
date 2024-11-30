"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoleSchema = new mongoose_1.default.Schema({
    title: String,
    permission: [{ type: String }],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const RoleModel = mongoose_1.default.model('RoleModel', RoleSchema, 'roles');
exports.default = RoleModel;
