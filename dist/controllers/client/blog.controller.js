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
exports.editPatch = exports.edit = exports.myBlog = exports.blogDetail = exports.createBlogPost = exports.createBlog = exports.index = void 0;
const blog_model_1 = __importDefault(require("../../models/blog.model"));
const pagination_helper_1 = require("../../helpers/pagination.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    const pagination = yield (0, pagination_helper_1.Pagination)(req, blog_model_1.default, find);
    const blogInfo = yield blog_model_1.default.find(find).limit(pagination.limitItems).skip(pagination.skip);
    res.render('client/pages/blog/index', {
        title: 'PetCommunity | Blog',
        blogInfo,
        pagination
    });
});
exports.index = index;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/blog/create', {
        title: 'Create Blog',
    });
});
exports.createBlog = createBlog;
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_blogger = req.params.id;
    const newBlogData = {
        thumbnail_photo: req.body.thumbnail_photo,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        uploadBy: req.body.uploadBy,
        id_blogger: id_blogger,
    };
    const newBlog = new blog_model_1.default(newBlogData);
    try {
        yield newBlog.save();
        res.redirect('/blog');
    }
    catch (error) {
        res.send('update failed');
    }
});
exports.createBlogPost = createBlogPost;
const blogDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const blogDetailInfo = yield blog_model_1.default.findOne({ _id: blogId });
    res.render('client/pages/blog/blogDetail', {
        title: 'PetCommunity | Blog Detail',
        blogDetailInfo,
    });
});
exports.blogDetail = blogDetail;
const myBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_blogger = req.params.id;
    const myBlog = yield blog_model_1.default.find({
        id_blogger: id_blogger,
    });
    res.render('client/pages/blog/myblog', {
        title: 'PetC | MyBlog',
        myBlog,
    });
});
exports.myBlog = myBlog;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blogData = yield blog_model_1.default.findOne({
        _id: id,
    });
    res.render('client/pages/blog/edit', {
        title: 'PetCommunity | Blog Edit',
        blogData,
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.redirect('/blog');
    }
    catch (error) {
        res.send('update failed');
    }
});
exports.editPatch = editPatch;
