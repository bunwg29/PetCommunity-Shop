"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const adminPrefix_1 = require("../../config/adminPrefix");
const auth = __importStar(require("../../middlewares/admin/auth.middleware"));
const user_route_1 = require("./user.route");
const dashboard_route_1 = require("./dashboard.route");
const auth_route_1 = require("./auth.route");
const blog_route_1 = require("./blog.route");
const pet_route_1 = require("./pet.route");
const foodpet_route_1 = require("./foodpet.route");
const toypet_route_1 = require("./toypet.route");
const setting_route_1 = require("./setting.route");
const orderFoodPet_route_1 = require("./orderFoodPet.route");
const orderToyPet_route_1 = require("./orderToyPet.route");
const toyOrder_route_1 = require("../client/toyOrder.route");
const RoutersAdmin = (app) => {
    const path = `${adminPrefix_1.systemConfig.prefixAdmin}`;
    app.use(`/${path}`, auth_route_1.authAdminRoutes);
    app.use(`/${path}`, auth.authAdmin, dashboard_route_1.dasboardAdminRoutes);
    app.use(`/${path}/user`, user_route_1.userAdminRoutes);
    app.use(`/${path}/blog`, auth.authAdmin, blog_route_1.blogAdminRoutes);
    app.use(`/${path}/pet`, auth.authAdmin, pet_route_1.petAdminRoutes);
    app.use(`/${path}/foodpet`, auth.authAdmin, foodpet_route_1.petFoodRoutes);
    app.use(`/${path}/toypet`, auth.authAdmin, toypet_route_1.toyPetRoutes);
    app.use(`/${path}/setting`, auth.authAdmin, setting_route_1.settingAdminRoutes);
    app.use(`/${path}/orderfoodpet`, auth.authAdmin, orderFoodPet_route_1.orderFoodPetRoutes);
    app.use(`/${path}/ordertoypet`, auth.authAdmin, orderToyPet_route_1.orderToyPetRoutes);
    app.use(`/${path}/ordertoypet`, auth.authAdmin, toyOrder_route_1.toyOrderRoutes);
};
exports.default = RoutersAdmin;
