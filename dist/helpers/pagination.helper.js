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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const Pagination = (req_1, model_1, ...args_1) => __awaiter(void 0, [req_1, model_1, ...args_1], void 0, function* (req, model, find = {}) {
    const pagination = {
        currentPage: 1,
        limitItems: 8,
    };
    const page = req.query.page;
    if (page && typeof page === 'string') {
        pagination.currentPage = parseInt(page);
    }
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;
    const count = yield model.countDocuments(find);
    const totalPage = Math.ceil(count / pagination.limitItems);
    pagination.totalPage = totalPage;
    return pagination;
});
exports.Pagination = Pagination;
