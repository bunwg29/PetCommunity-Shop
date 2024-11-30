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
exports.deleteImages = exports.deletePet = exports.petPatch = exports.petDetail = exports.index = void 0;
const moment_1 = __importDefault(require("moment"));
const pet_model_1 = __importDefault(require("../../models/pet.model"));
const adminPrefix_1 = require("../../config/adminPrefix");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = yield (0, pagination_helper_1.Pagination)(req, pet_model_1.default, {});
    const pet = yield pet_model_1.default.find()
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    const petInfo = pet.map((item) => (Object.assign(Object.assign({}, item.toObject()), { createDate: (0, moment_1.default)(item.createdAt).format('DD/MM/YYYY HH:mm:ss') })));
    res.render('admin/pages/pet/index', {
        title: 'Admin | Pet',
        petInfo,
        pagination,
    });
});
exports.index = index;
const petDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petDetail = yield pet_model_1.default.findOne({
        _id: req.params.id,
    });
    res.render('admin/pages/pet/edit.pug', {
        title: 'Admin | Pet Detail',
        petDetail,
    });
});
exports.petDetail = petDetail;
const petPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-product')) {
        req.body.price = parseInt(req.body.price);
        req.body.age = parseInt(req.body.age);
        const _a = req.body, { uploadedData } = _a, updateData = __rest(_a, ["uploadedData"]);
        try {
            yield pet_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({ $set: Object.assign({ avt: uploadedData.avt }, updateData) }, (uploadedData.images && uploadedData.images.length
                ? { $push: { images: { $each: uploadedData.images } } }
                : {})), { new: true });
            res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/pet`);
            req.flash('success', 'Update success');
        }
        catch (error) {
            req.flash('error', 'Update failed');
        }
    }
    else {
        req.flash('error', 'This is not your role');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
    }
});
exports.petPatch = petPatch;
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-product')) {
        yield pet_model_1.default.deleteOne({
            _id: req.params.id,
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
exports.deletePet = deletePet;
const deleteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-product')) {
        const { image, id } = req.params;
        const decodedImage = decodeURIComponent(image);
        try {
            const pet = yield pet_model_1.default.findByIdAndUpdate(id, { $pull: { images: decodedImage } }, { new: true });
            if (pet) {
                res.json({ code: 200 });
                req.flash('success', 'Update success');
            }
            else {
                res.status(404).json({ code: 404, message: 'Pet not found' });
            }
        }
        catch (error) {
            req.flash('error', 'Update failed');
        }
    }
    else {
        req.flash('error', 'This is not your role');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
    }
});
exports.deleteImages = deleteImages;
