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
exports.validatePetPost = void 0;
const validatePet = (reqBody) => {
    const errors = {};
    const { name, age, price, color, location } = reqBody;
    if (!name)
        errors.name = 'Name of pet is required';
    if (!age)
        errors.age = 'Age of pet is required';
    if (!price)
        errors.price = 'Price of pet is required';
    if (!color)
        errors.color = 'Color of pet is required';
    if (!location)
        errors.location = 'Location is required';
    if (name && name.length < 3)
        errors.name = 'Name must be at least 3 characters long';
    const ageRegex = /^[1-9]\d*$/;
    if (age && !ageRegex.test(age))
        errors.age = 'Invalid age format';
    const priceRegex = /^\d+(\.\d+)?$/;
    if (price && !priceRegex.test(price))
        errors.price = 'Invalid price format';
    return errors;
};
const validateForm = (req, res, next, validateFunction, renderView, title) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validateFunction(req.body);
    if (Object.keys(errors).length > 0) {
        return res.render(renderView, {
            title: title,
            errors,
        });
    }
    next();
});
const validatePetPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield validateForm(req, res, next, validatePet, 'client/pages/mypet/create', 'MyPet | Create');
});
exports.validatePetPost = validatePetPost;
