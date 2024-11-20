import {  Express } from "express";

import { systemConfig } from "../../config/adminPrefix";
import { accountAdminRoutes } from "./account.route";
import { dasboardAdminRoutes } from "./dashboard.route";

const RoutersAdmin = (app: Express): void => {

    const path = `${systemConfig.prefixAdmin}`;
    app.use(
        `/${path}/`,
        dasboardAdminRoutes
    );
    app.use(
        `/${path}/user`,
        accountAdminRoutes
    );


};

export default RoutersAdmin;