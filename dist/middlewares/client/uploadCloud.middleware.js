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
exports.uploadMultipeTypeForm = exports.uploadMultiple = exports.uploadSingle = void 0;
const streamUpload_helper_1 = require("../../helpers/streamUpload.helper");
const uploadSingle = (req, res, next) => {
    if (req['file']) {
        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, streamUpload_helper_1.streamUpload)(buffer);
            req.body[req['file'].fieldname] = result['url'];
            next();
        });
        uploadToCloudinary(req['file'].buffer);
    }
    else {
        next();
    }
};
exports.uploadSingle = uploadSingle;
const uploadMultiple = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        try {
            const uploadPromises = req.files.map((file) => (0, streamUpload_helper_1.streamUpload)(file.buffer));
            const results = yield Promise.all(uploadPromises);
            req.body['images'] = results.map((result) => result['url']);
            next();
        }
        catch (error) {
            res.send('TOANG');
        }
    }
    else {
        next();
    }
});
exports.uploadMultiple = uploadMultiple;
const uploadMultipeTypeForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files || {};
        const uploadedData = {};
        if (files['avt'] && files['avt'].length > 0) {
            const avtResult = yield (0, streamUpload_helper_1.streamUpload)(files['avt'][0].buffer);
            uploadedData.avt = avtResult.url;
        }
        if (files['images'] && files['images'].length > 0) {
            const uploadPromises = files['images'].map((file) => (0, streamUpload_helper_1.streamUpload)(file.buffer));
            const imagesResults = yield Promise.all(uploadPromises);
            uploadedData.images = imagesResults.map((result) => result.url);
        }
        req.body.uploadedData = uploadedData;
        next();
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading files to Cloudinary.',
        });
    }
});
exports.uploadMultipeTypeForm = uploadMultipeTypeForm;
