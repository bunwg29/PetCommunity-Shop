import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

import * as uploadCloud from '../middlewares/uploadCloud.middleware'
import * as controller from "../controllers/petProduct.controller";
import * as auth from "../middlewares/auth.middleware";
import { validatePetPost } from "../validates/petPost.validate";

const router: Router = Router();



router.get(
    "/product/:id",
    auth.setUserInfo,
    auth.requireAuth,
    controller.index
);

router.get(
    "/create/:id",
    auth.setUserInfo,
    auth.requireAuth,
    controller.create
);

router.post(
    "/create/:id",
    auth.setUserInfo,
    auth.requireAuth,
    upload.fields([
        { name: "avt", maxCount: 1 }, 
        { name: "images" }, 
    ]),
    validatePetPost,
    uploadCloud.uploadMultipeTypeForm,
    controller.createPost
);

router.get(
    "/edit/detail/:id",
    auth.setUserInfo,
    auth.requireAuth,
    controller.detail
);

router.patch(
    "/edit/detail/:id",
    auth.setUserInfo,
    auth.requireAuth,
    upload.fields([
        { name: "avt", maxCount: 1 }, 
        { name: "images" }, 
    ]),
    uploadCloud.uploadMultipeTypeForm,
    controller.editPatch
);

router.delete(
    "/image/:petId",
    auth.setUserInfo,
    auth.requireAuth,
    controller.deleteImages
);

router.delete(
    "/delete/:id",
    auth.setUserInfo,
    auth.requireAuth,
    controller.deletePet
);

export const petProductRoutes: Router = router;