"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const pet_route_1 = require("./pet.route");
const user_route_1 = require("./user.route");
const blog_route_1 = require("./blog.route");
const petProduct_route_1 = require("./petProduct.route");
const foodCart_route_1 = require("./foodCart.route");
const foodpet_route_1 = require("./foodpet.route");
const foodOrder_route_1 = require("./foodOrder.route");
const toypet_route_1 = require("./toypet.route");
const toycart_route_1 = require("./toycart.route");
const toyOrder_route_1 = require("./toyOrder.route");
const cartCookies_middleware_1 = require("../../middlewares/client/cartCookies.middleware");
const Routers = (app) => {
    app.use(cartCookies_middleware_1.cookiesCart);
    app.use('/', dashboard_route_1.dashboardRoutes);
    app.use('/pet', pet_route_1.petRoutes);
    app.use('/user', user_route_1.userRoutes);
    app.use('/blog', blog_route_1.blogRoutes);
    app.use('/mypet', petProduct_route_1.petProductRoutes);
    app.use('/foodpet', foodpet_route_1.foodPetRoutes);
    app.use('/toypet', toypet_route_1.toyPetRoutes);
    app.use('/cart', foodCart_route_1.cartRoutes);
    app.use('/toycart', toycart_route_1.cartToyRoutes);
    app.use('/order', foodOrder_route_1.orderRoutes);
    app.use('/toyorder', toyOrder_route_1.toyOrderRoutes);
};
exports.default = Routers;
