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
            size: Number,
            unit: String,
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
const FoodOrderModel = mongoose_1.default.model('FoodOrderModel', orderSchema, 'food_orders');
exports.default = FoodOrderModel;
