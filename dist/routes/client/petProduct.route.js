"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petProductRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});
const uploadCloud = __importStar(require("../../middlewares/client/uploadCloud.middleware"));
const controller = __importStar(require("../../controllers/client/petProduct.controller"));
const auth = __importStar(require("../../middlewares/client/authAccount.middleware"));
const petPost_validate_1 = require("../../validates/petPost.validate");
const router = (0, express_1.Router)();
router.get('/product/:id', auth.setUserInfo, auth.requireAuth, controller.index);
router.get('/create/:id', auth.setUserInfo, auth.requireAuth, controller.create);
router.post('/create/:id', auth.setUserInfo, auth.requireAuth, upload.fields([{ name: 'avt', maxCount: 1 }, { name: 'images' }]), petPost_validate_1.validatePetPost, uploadCloud.uploadMultipeTypeForm, controller.createPost);
router.get('/edit/detail/:id', auth.setUserInfo, auth.requireAuth, controller.detail);
router.patch('/edit/detail/:id', auth.setUserInfo, auth.requireAuth, upload.fields([{ name: 'avt', maxCount: 1 }, { name: 'images' }]), uploadCloud.uploadMultipeTypeForm, controller.editPatch);
router.delete('/delete/image/:petId', auth.setUserInfo, auth.requireAuth, controller.deleteImages);
router.delete('/delete/pet/:id', auth.setUserInfo, auth.requireAuth, controller.deletePet);
exports.petProductRoutes = router;
