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
exports.deleteBlog = exports.blogPatch = exports.blogDetail = exports.index = void 0;
const blog_model_1 = __importDefault(require("../../models/blog.model"));
const moment_1 = __importDefault(require("moment"));
const adminPrefix_1 = require("../../config/adminPrefix");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pagination = yield (0, pagination_helper_1.Pagination)(req, blog_model_1.default, {});
    const blog = yield blog_model_1.default.find()
        .limit(pagination.limitItems)
        .skip(pagination.skip);
    const blogInfo = blog.map((item) => (Object.assign(Object.assign({}, item.toObject()), { createDate: (0, moment_1.default)(item.createdAt).format('DD/MM/YYYY HH:mm:ss') })));
    res.render('admin/pages/blog/index', {
        title: 'Admin | Blog',
        blogInfo,
        pagination,
    });
});
exports.index = index;
const blogDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = yield blog_model_1.default.findOne({
        _id: req.params.id,
    });
    res.render('admin/pages/blog/detail.pug', {
        title: 'Admin | Blog-Detail',
        blogData,
    });
});
exports.blogDetail = blogDetail;
const blogPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-blog')) {
        const id_blog = req.params.id;
        const newBlogData = {
            thumbnail_photo: req.body.thumbnail_photo,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            uploadBy: req.body.uploadBy,
        };
        try {
            yield blog_model_1.default.updateOne({ _id: id_blog }, newBlogData);
            req.flash('success', 'Update success');
            res.redirect(`/${adminPrefix_1.systemConfig.prefixAdmin}/blog`);
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
exports.blogPatch = blogPatch;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.roles.permission.includes('crud-blog')) {
        const idBlog = req.params.id;
        try {
            yield blog_model_1.default.deleteOne({
                _id: idBlog,
            });
            req.flash('success', 'Update success');
            res.json({
                code: 200,
            });
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
exports.deleteBlog = deleteBlog;
