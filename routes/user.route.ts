import { Router } from "express";

const router: Router = Router();

import * as controller from "../controllers/user.controller";
import * as validate from "../validates/register.validates";

router.get("/signin", controller.signin);
router.post("/signin", controller.signinPost);
router.get("/signup", controller.signup);
router.post("/signup", validate.registerValidate, controller.signupPost);
router.get("/logout", controller.logout);
router.get("/forgot-password", controller.forgotPassword);
router.post("/forgot-password", controller.forgotPasswordPost);
router.get("/forgot-password/otp", controller.otpPassword);
router.post("/forgot-password/otp", controller.otpPasswordPost);
router.get("/password/reset", controller.resetPassword);
router.patch("/password/reset", validate.validatePassword, controller.resetPasswordPatch);
export const userRoutes: Router = router;
