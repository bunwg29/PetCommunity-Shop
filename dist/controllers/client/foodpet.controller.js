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
exports.detail = exports.index = void 0;
const foodPet_model_1 = __importDefault(require("../../models/foodPet.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const pagination = yield (0, pagination_helper_1.Pagination)(req, foodPet_model_1.default, find);
    const foodPet = yield foodPet_model_1.default.find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    res.render('client/pages/foodpet/index', {
        title: 'Category | FoodPet',
        foodPet,
        pagination,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodPet = yield foodPet_model_1.default.findOne({
        _id: req.params.id,
    });
    res.render('client/pages/foodpet/detail', {
        title: 'FoodPet | Detail',
        foodPet,
    });
});
exports.detail = detail;
