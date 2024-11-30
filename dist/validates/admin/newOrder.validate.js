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
exports.validateInfo = exports.validateInput = void 0;
const validateInput = (data) => {
    const errors = {};
    const { name, email, phone, address } = data;
    if (!email)
        errors.email = 'Email is required';
    if (!name)
        errors.name = 'Name is required';
    if (!phone)
        errors.phone = 'Phone number is required';
    if (!address)
        errors.address = 'Facebook address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
        errors.email = 'Invalid email format';
    if (name && name.length < 3)
        errors.name = 'Name must be at least 3 characters long';
    const phoneRegex = /^0\d{9}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.phone = 'Invalid phone number format';
    }
    return errors;
};
exports.validateInput = validateInput;
const validateInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, exports.validateInput)(req.body);
    if (Object.keys(errors).length > 0) {
        req.flash('warming', 'All input are required and true format');
        res.redirect('/toycart');
    }
    else {
        next();
    }
});
exports.validateInfo = validateInfo;
