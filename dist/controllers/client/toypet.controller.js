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
const toyPet_model_1 = __importDefault(require("../../models/toyPet.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const pagination = yield (0, pagination_helper_1.Pagination)(req, toyPet_model_1.default, find);
    const toyPet = yield toyPet_model_1.default.find(find);
    res.render('client/pages/toypet/index', {
        title: 'Category | Toypet',
        toyPet,
        pagination,
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toyPet = yield toyPet_model_1.default.findOne({
        _id: req.params.id,
    });
    res.render('client/pages/toypet/detail', {
        title: 'Toypet | Detail',
        toyPet,
    });
});
exports.detail = detail;
