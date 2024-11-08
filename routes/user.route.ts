import { Router } from "express";

const router: Router = Router();
import multer from 'multer';

import * as controller from "../controllers/user.controller";
import * as validate from "../validates/register.validates";
import * as userMiddleWare from "../middlewares/auth.middleware";
import * as uploadCloud from "../middlewares/uploadCloud.middleware";

const upload = multer();

router.get("/signin", controller.signin);
router.post("/signin", controller.signinPost);
router.get("/signup", controller.signup);
router.post(
    "/signup",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.registerValidate, 
    controller.signupPost
);
router.get("/logout", controller.logout);
router.get("/forgot-password", controller.forgotPassword);
router.post("/forgot-password", controller.forgotPasswordPost);
router.get("/forgot-password/otp", controller.otpPassword);
router.post("/forgot-password/otp", controller.otpPasswordPost);
router.get(
    "/password/reset",
    userMiddleWare.authenticateUser,
    controller.resetPassword
);
router.patch(
    "/password/reset",
    userMiddleWare.authenticateUser,
    validate.validatePassword,
    controller.resetPasswordPatch
);
export const userRoutes: Router = router;
