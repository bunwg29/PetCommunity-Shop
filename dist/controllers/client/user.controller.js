"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.profileEdit = exports.profile = exports.resetPasswordPatch = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.signinPost = exports.signin = exports.signupPost = exports.signup = void 0;
const md5_1 = __importDefault(require("md5"));
const moment_1 = __importDefault(require("moment"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const generateHelper = __importStar(require("../../helpers/generateCode.helper"));
const sendMailHelper = __importStar(require("../../helpers/sendMail.helper"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = res.locals.errors || null;
    res.render('client/pages/user/signup', {
        title: 'PetCommunity | SignUp',
        errors,
    });
});
exports.signup = signup;
const signupPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phonenumber,
        password: (0, md5_1.default)(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
        linkFb: req.body.facebook_address,
        thumbnail: req.body.thumbnail,
    };
    const newUser = new account_model_1.default(userData);
    try {
        yield newUser.save();
        res.cookie('tokenUser', newUser.tokenUser);
        res.redirect('/user/signin');
    }
    catch (error) {
        res.locals.errors = { general: 'Register falied, try again!' };
        return res.redirect('/user/signup');
    }
});
exports.signupPost = signupPost;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = res.locals.errors || null;
    res.render('client/pages/user/signin', {
        title: 'PetCommunity | SignIn',
        errors,
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
        res.render('client/pages/user/signin', {
            title: 'PetCommunity | SignIn',
            errors,
            user,
        });
        return;
    }
    if ((0, md5_1.default)(req.body.password) != user.password) {
        errors.password = 'Wrong password';
        res.locals.errors = errors;
        res.render('client/pages/user/signin', {
            title: 'PetCommunity | SignIn',
            errors,
        });
        return;
    }
    if (user && (0, md5_1.default)(req.body.password) === user.password) {
        res.cookie('tokenUser', user.tokenUser);
        res.redirect('/');
    }
});
exports.signinPost = signinPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('tokenUser');
    res.redirect('/');
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = res.locals.errors || null;
    res.render('client/pages/user/forgot-password', {
        title: 'PetComunity | Forgot Password',
        errors,
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const errors = {};
    const find = {
        deleted: false,
        email: email,
    };
    const emailAccount = yield account_model_1.default.findOne(find);
    if (!emailAccount) {
        errors.email = 'Not exist email';
        res.locals.errors = errors;
        res.render('client/pages/user/forgot-password', {
            title: 'PetCommunity | SignIn',
            errors,
        });
        return;
    }
    const otp = generateHelper.generateRandomNumber(6);
    const forgotPasswordData = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3 * 60 * 60,
    };
    const forgotPassword = new forgot_password_model_1.default(forgotPasswordData);
    yield forgotPassword.save();
    const subject = 'OTP code to get reset password';
    const htmlSendMail = `Your OTP authentication code is <b style="color: green;">${otp}</b>. OTP code is valid for 3 minutes. Please do not provide OTP code to others.`;
    sendMailHelper.sendEmail(email, subject, htmlSendMail);
    res.redirect(`/user/forgot-password/otp?email=${email}`);
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const errors = res.locals.errors || null;
    res.render('client/pages/user/otp-password', {
        title: 'PetCommunity | OTP',
        email,
        errors,
    });
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp_code;
    const errors = {};
    const otpCode = yield forgot_password_model_1.default.findOne({
        email: email,
        otp: otp,
    });
    if (!otpCode) {
        errors.otp = 'Incorrect OTP';
        res.locals.errors = errors;
        res.render('client/pages/user/otp-password', {
            title: 'PetCommunity | OTP',
            email,
            errors,
        });
        return;
    }
    const user = yield account_model_1.default.findOne({
        email: email,
    });
    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/user/password/reset');
});
exports.otpPasswordPost = otpPasswordPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/reset-password', {
        title: 'PetCommunity | Reset Password',
    });
});
exports.resetPassword = resetPassword;
const resetPasswordPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    yield account_model_1.default.updateOne({
        tokenUser: tokenUser,
        deleted: false,
    }, {
        password: (0, md5_1.default)(password),
    });
    res.redirect('/user/signin');
});
exports.resetPasswordPatch = resetPasswordPatch;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = res.locals.user.dateBirth;
    const formattedDate = (0, moment_1.default)(date).format('yyyy-MM-DD');
    res.render('client/pages/user/profile', {
        title: 'PetCommunity | Profile',
        formattedDate,
    });
});
exports.profile = profile;
const profileEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield account_model_1.default.updateOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
    }, req.body);
    res.redirect('/user/profile');
});
exports.profileEdit = profileEdit;
