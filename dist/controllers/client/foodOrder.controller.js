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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderOrderSuccess = exports.createOrder = void 0;
const foodCart_model_1 = __importDefault(require("../../models/foodCart.model"));
const foodPet_model_1 = __importDefault(require("../../models/foodPet.model"));
const foodOrder_model_1 = __importDefault(require("../../models/foodOrder.model"));
const moment_1 = __importDefault(require("moment"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCart = req.cookies.foodCart;
    const _a = req.body, { totalPrice } = _a, userInfo = __rest(_a, ["totalPrice"]);
    const orderData = {
        userInfo: userInfo,
        products: [],
        totalPrice: totalPrice,
    };
    const cart = yield foodCart_model_1.default.findOne({ _id: foodCart });
    if (cart) {
        try {
            for (const item of cart.products) {
                const productInfo = yield foodPet_model_1.default.findOne({
                    _id: item.product_id,
                });
                orderData.products.push({
                    avt: productInfo.avt,
                    name: productInfo.name,
                    size: productInfo.size,
                    unit: productInfo.unit,
                    productId: item.product_id,
                    price: productInfo.price,
                    quantity: item.quantity,
                });
            }
            const order = new foodOrder_model_1.default(orderData);
            yield order.save();
            yield foodCart_model_1.default.updateOne({ _id: foodCart }, { products: [] });
            res.redirect(`/order/success?orderId=${order._id}`);
            req.flash('success', 'You have ordered successfully');
        }
        catch (error) {
            req.flash('error', 'System error');
        }
    }
    else {
        req.flash('warming', 'Order failed');
        res.redirect('/');
    }
});
exports.createOrder = createOrder;
const renderOrderSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.query;
    const order = yield foodOrder_model_1.default.findOne({ _id: orderId });
    const orderDate = (0, moment_1.default)(order.createdAt).format('Do MMMM YYYY');
    const shipDate = (0, moment_1.default)(order.createdAt)
        .add(3, 'days')
        .format('Do MMMM YYYY');
    res.render('client/pages/foodOrder/success', {
        title: 'Order | Confirm',
        orderData: order,
        orderDate,
        shipDate,
    });
});
exports.renderOrderSuccess = renderOrderSuccess;
