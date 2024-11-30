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
exports.deletePet = exports.deleteImages = exports.foodPetDetailPatch = exports.createPost = exports.create = exports.foodPetDetail = exports.index = void 0;
const adminPrefix_1 = require("../../config/adminPrefix");
const foodPet_model_1 = __importDefault(require("../../models/foodPet.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = yield (0, pagination_helper_1.Pagination)(req, foodPet_model_1.default, {});
    const foodPet = yield foodPet_model_1.default.find()
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    res.render('admin/pages/foodpet/index', {
        title: 'Admin | FoodPet',
        foodPet,
        pagination,
    });
});
exports.index = index;
const foodPetDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodPetDetail = yield foodPet_model_1.default.findOne({ _id: req.params.id });
    res.render('admin/pages/foodpet/edit', {
        title: 'Admin | FoodPet | Detail',
        foodPetDetail,
    });
});
exports.foodPetDetail = foodPetDetail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('admin/pages/foodpet/create', {
        title: 'Admin | FoodPet | Create',
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-food-pet')) {
        try {
            const { name, type, size, unit, price, special_offer, uploadedData } = req.body;
            const newFoodPet = new foodPet_model_1.default({
                name,
                type,
                size: parseFloat(size),
                unit,
                price: parseFloat(price),
                special_offer,
                avt: uploadedData.avt,
                images: uploadedData.images,
            });
            const foodPet = yield newFoodPet.save();
            if (foodPet) {
                req.flash('success', 'Create success');
            }
            res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/foodpet`);
        }
        catch (error) {
            req.flash('error', 'Update failed');
            res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
        }
    }
    else {
        req.flash('error', 'This is not your role');
        res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/`);
    }
});
exports.createPost = createPost;
const foodPetDetailPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-food-pet')) {
        req.body.price = parseInt(req.body.price);
        req.body.size = parseInt(req.body.size);
        const _a = req.body, { uploadedData } = _a, updateData = __rest(_a, ["uploadedData"]);
        try {
            yield foodPet_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({ $set: Object.assign({ avt: uploadedData.avt }, updateData) }, (uploadedData.images && uploadedData.images.length
                ? { $push: { images: { $each: uploadedData.images } } }
                : {})), { new: true });
            res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/foodpet`);
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
exports.foodPetDetailPatch = foodPetDetailPatch;
const deleteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-food-pet')) {
        const { image, id } = req.params;
        const decodedImage = decodeURIComponent(image);
        try {
            const pet = yield foodPet_model_1.default.findByIdAndUpdate(id, { $pull: { images: decodedImage } }, { new: true });
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
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-food-pet')) {
        yield foodPet_model_1.default.deleteOne({
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
