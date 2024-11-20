import { Router } from "express";

const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";

router.get("/", controller.index);


export const userAdminRoutes: Router = router;