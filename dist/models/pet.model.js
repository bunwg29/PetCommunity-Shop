"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const petSchema = new mongoose_1.default.Schema({
    name: String,
    gene: String,
    age: Number,
    price: Number,
    avt: String,
    images: [{ type: String }],
    size: String,
    color: String,
    vacinated: String,
    dewormed: String,
    cert: String,
    location: String,
    additional_info: String,
    slug: {
        type: String,
        slug: 'name',
        unique: true,
    },
    uploadBy: String,
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const PetModel = mongoose_1.default.model('PetModel', petSchema, 'pet');
exports.default = PetModel;
