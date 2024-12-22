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
exports.cookiesCart = void 0;
const foodCart_model_1 = __importDefault(require("../../models/foodCart.model"));
const toyCart_model_1 = __importDefault(require("../../models/toyCart.model"));
const setCartCookies = (res, foodCartId, toyCartId, expires) => {
    res.cookie('foodCart', foodCartId, { expires: new Date(Date.now() + expires) });
    res.cookie('toyCart', toyCartId, { expires: new Date(Date.now() + expires) });
};
const cookiesCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    const foodCartCookies = req.cookies.foodCart;
    const toyCartCookies = req.cookies.toyCart;
    const expires = 30 * 24 * 60 * 60 * 1000;
    if (!tokenUser) {
        if (foodCartCookies || toyCartCookies) {
            res.clearCookie('foodCart');
            res.clearCookie('toyCart');
        }
        return next();
    }
    try {
        const foodCartId = yield foodCart_model_1.default.findOne({ userId: tokenUser });
        const toyCartId = yield toyCart_model_1.default.findOne({ userId: tokenUser });
        if (foodCartCookies && toyCartCookies) {
            if (foodCartId && toyCartId &&
                (foodCartCookies !== foodCartId._id.toString() || toyCartCookies !== toyCartId._id.toString())) {
                setCartCookies(res, foodCartId._id.toString(), toyCartId._id.toString(), expires);
            }
            return next();
        }
        if (!foodCartCookies && !toyCartCookies) {
            if (foodCartId && toyCartId) {
                setCartCookies(res, foodCartId._id.toString(), toyCartId._id.toString(), expires);
            }
            else {
                const foodCart = new foodCart_model_1.default({ userId: tokenUser });
                const toyCart = new toyCart_model_1.default({ userId: tokenUser });
                yield foodCart.save();
                yield toyCart.save();
                setCartCookies(res, foodCart._id.toString(), toyCart._id.toString(), expires);
            }
        }
    }
    catch (error) {
        req.flash('error', 'Server error');
    }
    next();
});
exports.cookiesCart = cookiesCart;
