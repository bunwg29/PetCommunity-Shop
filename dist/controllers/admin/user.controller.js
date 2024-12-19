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
exports.deleteUser = exports.detailPatch = exports.detail = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const moment_1 = __importDefault(require("moment"));
const adminPrefix_1 = require("../../config/adminPrefix");
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = yield (0, pagination_helper_1.Pagination)(req, account_model_1.default, {});
    const userInfo = yield account_model_1.default.find({
        _id: { $ne: res.locals.account._id },
    })
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    const user = userInfo.map((item) => (Object.assign(Object.assign({}, item.toObject()), { dateJoin: (0, moment_1.default)(item.createdAt).format('DD/MM/YYYY HH:mm:ss'), dateBirth: (0, moment_1.default)(item.dateBirth).local().format('DD/MM/YYYY') })));
    res.render('admin/pages/user/index', {
        title: 'Admin | Account',
        user,
        pagination,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const userInfo = yield account_model_1.default.findOne({ _id: idUser });
    userInfo.dateBirth = (0, moment_1.default)(userInfo.dateBirth).format('YYYY-MM-DD');
    const role = yield roles_model_1.default.findOne({ _id: userInfo.role_id })
        .select('permission')
        .lean();
    let id_role = null;
    if (res.locals.roles.permission.includes('all')) {
        id_role = yield roles_model_1.default.find({ title: { $ne: 'Admin' } }).select('_id');
    }
    res.render('admin/pages/user/edit', {
        title: 'Admin | UserInfo',
        userInfo,
        role: role,
        id_role: id_role,
    });
});
exports.detail = detail;
const detailPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-user')) {
        yield account_model_1.default.updateOne({
            _id: req.params.id,
            deleted: false,
        }, req.body);
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/user`);
        req.flash('success', 'Update success');
    }
    else {
        req.flash('error', 'This is not your role');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
    }
});
exports.detailPatch = detailPatch;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-user')) {
        const id = req.params.id;
        yield account_model_1.default.deleteOne({
            _id: id,
        });
        res.json({
            code: 200,
        });
        req.flash('success', 'Update success');
    }
    else {
        req.flash('error', 'This is not your role');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
    }
});
exports.deleteUser = deleteUser;
