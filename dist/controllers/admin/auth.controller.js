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
exports.logout = exports.signinPost = exports.signin = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const adminPrefix_1 = require("../../config/adminPrefix");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('admin/pages/auth/signin', {
        title: 'Admin | Signin',
    });
});
exports.signin = signin;
const signinPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    const userInfo = {
        email: req.body.email,
        deleted: false,
    };
    const user = yield account_model_1.default.findOne(userInfo);
    if (!user) {
        errors.email = 'Not exist email';
        res.locals.errors = errors;
        res.render('admin/pages/auth/signin', {
            title: 'PetCommunity | SignIn',
            errors,
            user,
        });
        return;
    }
    if ((0, md5_1.default)(req.body.password) != user.password) {
        errors.password = 'Wrong password';
        res.locals.errors = errors;
        res.render('admin/pages/auth/signin', {
            title: 'PetCommunity | SignIn',
            errors,
        });
        return;
    }
    if (user && (0, md5_1.default)(req.body.password) === user.password) {
        res.cookie('tokenUser', user.tokenUser);
        req.flash('success', 'Login Success');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}`);
    }
});
exports.signinPost = signinPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('tokenUser');
    req.flash('success', 'Logout success');
    res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/signin`);
});
exports.logout = logout;
