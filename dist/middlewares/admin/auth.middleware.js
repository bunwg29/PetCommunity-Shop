"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const adminPrefix_1 = require("../../config/adminPrefix");
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.tokenUser) {
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/signin`);
        return;
    }
    const account = yield account_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
    }).select('role_id name _id');
    if (!account) {
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/signin`);
        return;
    }
    const roleAdmin = yield roles_model_1.default.findOne({
        _id: account.role_id,
    })
        .select('title permission')
        .lean();
    if (!roleAdmin) {
        res.redirect(`/signin`);
        return;
    }
    res.locals.roles = roleAdmin;
    res.locals.account = account;
    next();
});
exports.authAdmin = authAdmin;
