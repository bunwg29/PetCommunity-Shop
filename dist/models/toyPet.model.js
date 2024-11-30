"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const toyPetSchema = new mongoose_1.default.Schema({
    name: String,
    type: String,
    price: Number,
    special_offer: String,
    avt: String,
    images: [{ type: String }],
    slug: {
        type: String,
        slug: 'name',
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const ToyPetModel = mongoose_1.default.model('ToyPetModel', toyPetSchema, 'toy_pet');
exports.default = ToyPetModel;
