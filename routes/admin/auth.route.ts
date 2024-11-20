import { Router } from "express";

const router: Router = Router();

import * as controller from "../../controllers/admin/auth.controller";

// [GET] admin/user/signin
router.get("/signin", controller.signin);

// [POST] admin/user/signin
router.post("/signin", controller.signinPost);


export const authAdminRoutes: Router = router;