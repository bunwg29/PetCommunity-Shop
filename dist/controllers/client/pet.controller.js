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
exports.petDetail = exports.index = void 0;
const pet_model_1 = __importDefault(require("../../models/pet.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const { gender, minPrice, maxPrice, size, sortKey, sortValue } = req.query;
    if (typeof gender === 'string') {
        find.gene = { $in: gender.split(',') };
    }
    if (minPrice || (maxPrice && maxPrice !== 'Infinity')) {
        find.price = {};
        if (minPrice)
            find.price.$gte = parseInt(minPrice, 10);
        if (maxPrice && maxPrice !== 'Infinity')
            find.price.$lte = parseInt(maxPrice, 10);
    }
    if (typeof size === 'string') {
        find.size = { $in: size.split(',') };
    }
    const pagination = yield (0, pagination_helper_1.Pagination)(req, pet_model_1.default, find);
    let sort = {};
    if (sortKey && sortValue) {
        const sortDirection = sortValue === 'desc' ? -1 : 1;
        switch (sortKey) {
            case 'updatedAt':
            case 'createdAt':
            case 'age':
                sort = { [sortKey]: sortDirection };
                break;
            default:
                sort = { updatedAt: -1 };
        }
    }
    else {
        sort = { updatedAt: -1 };
    }
    const petProduct = yield pet_model_1.default.find(find)
        .sort(sort)
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    res.render('client/pages/pet/index', {
        title: 'PetCommunity | Category',
        petProduct: petProduct,
        pagination,
        selectedFilters: { gender, minPrice, maxPrice, size, sortKey, sortValue },
        isCategory: true,
    });
});
exports.index = index;
const petDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const findPetDetail = {
        deleted: false,
        slug: slug,
    };
    const find = {
        deleted: false,
    };
    const petProduct = yield pet_model_1.default.find(find);
    const petDetail = yield pet_model_1.default.findOne(findPetDetail);
    res.render('client/pages/pet/petDetail', {
        title: 'PetCommunity | Product',
        petDetail: petDetail,
        petProduct: petProduct,
    });
});
exports.petDetail = petDetail;
