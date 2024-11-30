"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const blogSchema = new mongoose_1.default.Schema({
    thumbnail_photo: String,
    title: String,
    description: String,
    content: String,
    uploadBy: String,
    id_blogger: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const BlogModel = mongoose_1.default.model('BlogModel', blogSchema, 'blog');
exports.default = BlogModel;
