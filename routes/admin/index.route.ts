import {  Express } from "express";

import { systemConfig } from "../../config/adminPrefix";
import { userAdminRoutes } from "./user.route";

const RoutersAdmin = (app: Express): void => {

    const path = `${systemConfig.prefixAdmin}`;

    app.use(
        `/${path}/user`,
        userAdminRoutes
    );


};

export default RoutersAdmin;