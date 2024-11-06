import { Router } from "express";

const router: Router = Router();

import * as controller from "../controllers/user.controller";
import * as validate from "../validates/register.validates";

router.get("/signin", controller.signin);
router.post("/signin", controller.signinPost);
router.get("/signup", controller.signup);
router.post("/signup", validate.registerValidate, controller.signupPost);
router.get("/logout", controller.logout)
export const userRoutes: Router = router;
