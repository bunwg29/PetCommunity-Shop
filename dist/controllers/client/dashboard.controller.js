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
exports.index = void 0;
const pet_model_1 = __importDefault(require("../../models/pet.model"));
const foodPet_model_1 = __importDefault(require("../../models/foodPet.model"));
const toyPet_model_1 = __importDefault(require("../../models/toyPet.model"));
const blog_model_1 = __importDefault(require("../../models/blog.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const petInfo = yield pet_model_1.default.find(find).sort({ updatedAt: -1 }).limit(8);
    const foodPetInfo = yield foodPet_model_1.default.find(find)
        .sort({ updatedAt: -1 })
        .limit(8);
    const toyPetInfo = yield toyPet_model_1.default.find(find)
        .sort({ updatedAt: -1 })
        .limit(8);
    const blogInfo = yield blog_model_1.default.find(find).sort({ updatedAt: -1 }).limit(3);
    res.render('client/pages/dashboard/index', {
        title: 'PetCommunity',
        user: res.locals.user ? res.locals.user : null,
        petInfo: petInfo,
        foodPetInfo: foodPetInfo,
        toyPetInfo: toyPetInfo,
        blogInfo: blogInfo,
        isDashboard: true,
    });
});
exports.index = index;
