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
exports.requireAuth = exports.setUserInfo = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const setUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.tokenUser;
    if (token) {
        const user = yield account_model_1.default.findOne({ tokenUser: token });
        if (user) {
            res.locals.user = user;
        }
    }
    next();
});
exports.setUserInfo = setUserInfo;
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.tokenUser) {
        res.redirect('/user/signin');
        return;
    }
    const account = yield account_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
    });
    if (!account) {
        res.redirect('/user/signin');
        return;
    }
    next();
});
exports.requireAuth = requireAuth;
