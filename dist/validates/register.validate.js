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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.registerValidate = void 0;
const registerValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, phonenumber, password, confirmpassword } = req.body;
    const errors = {};
    if (!email)
        errors.email = 'Email is required';
    if (!name)
        errors.name = 'Name is required';
    if (!phonenumber)
        errors.phonenumber = 'Phone number is required';
    if (!password)
        errors.password = 'Password is required';
    if (!confirmpassword)
        errors.confirmpassword = 'Confirm password is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
        errors.email = 'Invalid email format';
    if (name && name.length < 3)
        errors.name = 'Name must be at least 3 characters long';
    const phoneRegex = /^0\d{9}$/;
    if (phonenumber && !phoneRegex.test(phonenumber)) {
        errors.phonenumber = 'Invalid phone number format';
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
        errors.password =
            'Password must contain uppercase, lowercase, number, and special character';
    }
    if (password && confirmpassword && password !== confirmpassword) {
        errors.confirmpassword = 'Passwords do not match';
    }
    if (Object.keys(errors).length > 0) {
        res.locals.errors = errors;
        return res.render('client/pages/user/signup', {
            title: 'PetCommunity | SignUp',
            errors,
        });
    }
    else {
        next();
    }
});
exports.registerValidate = registerValidate;
const validatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password)
        errors.password = 'Password is required';
    if (!confirm_password)
        errors.confirm_password = 'Confirm password is required';
    if (password && !passwordRegex.test(password)) {
        errors.password =
            'Password must contain uppercase, lowercase, number, and special character';
    }
    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = 'Passwords do not match';
    }
    if (Object.keys(errors).length > 0) {
        res.locals.errors = errors;
        return res.render('client/pages/user/reset-password', {
            title: 'PetCommunity | Reset password',
            errors,
        });
    }
    else {
        next();
    }
});
exports.validatePassword = validatePassword;
