"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
    },
    products: [
        {
            avt: String,
            name: String,
            productId: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: 'Confirming',
    },
}, {
    timestamps: true,
});
const ToyOrderModel = mongoose_1.default.model('ToyOrderModel', orderSchema, 'toy_orders');
exports.default = ToyOrderModel;
