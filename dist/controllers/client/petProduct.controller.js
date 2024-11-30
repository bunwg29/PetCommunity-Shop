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
exports.deletePet = exports.deleteImages = exports.editPatch = exports.createPost = exports.create = exports.detail = exports.index = void 0;
const pet_model_1 = __importDefault(require("../../models/pet.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        uploadBy: req.params.id,
        deleted: false,
    };
    const myPet = yield pet_model_1.default.find(find);
    res.render('client/pages/mypet/index.pug', {
        title: 'MyPet | Product',
        myPet,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        _id: req.params.id,
        deleted: false,
    };
    const petDetail = yield pet_model_1.default.findOne(find);
    res.render('client/pages/mypet/edit.pug', {
        title: 'MyPet | Pet Detail',
        petDetail,
    });
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/mypet/create', {
        title: 'MyPet | Create',
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gene, age, price, size, color, vacinated, dewormed, cert, location, additional_info, uploadedData, } = req.body;
        const newPet = new pet_model_1.default({
            name,
            gene,
            age: parseInt(age, 10),
            price: parseFloat(price),
            avt: uploadedData.avt,
            size,
            color,
            vacinated,
            dewormed,
            cert,
            location,
            additional_info,
            images: uploadedData.images,
            uploadBy: req.params.id,
        });
        yield newPet.save();
        res.redirect('/pet');
    }
    catch (error) {
        res.send('sập sàn');
    }
});
exports.createPost = createPost;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.price = parseInt(req.body.price);
    req.body.age = parseInt(req.body.age);
    const _a = req.body, { uploadedData } = _a, updateData = __rest(_a, ["uploadedData"]);
    try {
        yield pet_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({ $set: Object.assign({ avt: uploadedData.avt }, updateData) }, (uploadedData.images && uploadedData.images.length
            ? { $push: { images: { $each: uploadedData.images } } }
            : {})), { new: true });
        res.redirect('/pet');
    }
    catch (error) {
        console.log(error);
    }
});
exports.editPatch = editPatch;
const deleteImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = req.body.petId;
    const imageUrl = req.body.imageUrl;
    try {
        yield pet_model_1.default.findByIdAndUpdate(petId, { $pull: { images: imageUrl } }, { new: true });
        res.redirect(`/mypet/edit/detail/${petId}`);
    }
    catch (error) {
        res.send('TOANG');
    }
});
exports.deleteImages = deleteImages;
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pet_model_1.default.findByIdAndDelete(req.body.petDeleteId);
    res.redirect(`/mypet/product/${res.locals.user.id}`);
});
exports.deletePet = deletePet;
