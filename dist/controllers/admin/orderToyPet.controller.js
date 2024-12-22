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
exports.deleteOrder = exports.confirmOrder = exports.detail = exports.index = void 0;
const moment_1 = __importDefault(require("moment"));
const toyOrder_model_1 = __importDefault(require("../../models/toyOrder.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const adminPrefix_1 = require("../../config/adminPrefix");
const sendMail_helper_1 = require("../../helpers/sendMail.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = yield (0, pagination_helper_1.Pagination)(req, toyOrder_model_1.default, {});
    const order = yield toyOrder_model_1.default.find()
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    const orderInfo = order.map((item) => (Object.assign(Object.assign({}, item.toObject()), { createDate: (0, moment_1.default)(item.createdAt).format('DD/MM/YYYY HH:mm:ss') })));
    res.render('admin/pages/orderToyPet/index', {
        title: 'Order | FoodPet',
        orderInfo,
        pagination,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const orderDetail = yield toyOrder_model_1.default.findOne({ _id: orderId });
    const orderDate = (0, moment_1.default)(orderDetail.createdAt).format('Do MMMM YYYY');
    const shipDate = (0, moment_1.default)(orderDetail.createdAt)
        .add(3, 'days')
        .format('Do MMMM YYYY');
    res.render('admin/pages/orderToyPet/detail', {
        title: 'Order | Detail',
        orderDetail,
        orderDate,
        shipDate,
    });
});
exports.detail = detail;
const confirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const orderId = req.params.id;
    const subject = 'CONFIRM ORDER';
    const htmlSendMail = `Your order #${orderId} has been confirmed by us. This package will be sent to you according to the plan`;
    (0, sendMail_helper_1.sendEmail)(email, subject, htmlSendMail);
    const order = yield toyOrder_model_1.default.updateOne({ _id: orderId }, { status: 'Confirmed' });
    if (order) {
        req.flash('success', 'This order has been confirmed');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/ordertoypet`);
    }
});
exports.confirmOrder = confirmOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield toyOrder_model_1.default.findByIdAndDelete(orderId);
    if (order) {
        res.json({
            code: 200,
        });
        req.flash('success', 'Delete order success');
    }
});
exports.deleteOrder = deleteOrder;
