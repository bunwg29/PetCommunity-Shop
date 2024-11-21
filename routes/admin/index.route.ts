import {  Express } from "express";

import { systemConfig } from "../../config/adminPrefix";
import * as auth from "../../middlewares/admin/auth.middleware";

import { userAdminRoutes } from "./user.route";
import { dasboardAdminRoutes } from "./dashboard.route";
import { authAdminRoutes } from "./auth.route";
import { blogAdminRoutes } from "./blog.route";
import { petAdminRoutes } from "./pet.route";
import { petFoodRoutes } from "./foodpet.route";
import { toyPetRoutes } from "./toypet.route";

const RoutersAdmin = (app: Express): void => {

    const path = `${systemConfig.prefixAdmin}`;

    app.use(
        `/${path}`,
        authAdminRoutes
    );

    app.use(
        `/${path}`,
        auth.authAdmin,
        dasboardAdminRoutes
    );
    
    app.use(
        `/${path}/user`,
        userAdminRoutes
    );

    app.use(
        `/${path}/blog`,
        auth.authAdmin,
        blogAdminRoutes
    );

    app.use(
        `/${path}/pet`,
        auth.authAdmin,
        petAdminRoutes
    );

    app.use(
        `/${path}/foodpet`,
        auth.authAdmin,
        petFoodRoutes
    );

    app.use(
       `/${path}/toypet`,
        auth.authAdmin,
        toyPetRoutes
    );

};

export default RoutersAdmin;