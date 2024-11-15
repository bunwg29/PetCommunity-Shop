import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage(); // Lưu file trong bộ nhớ trước khi upload
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file: 10MB
});

import * as uploadCloud from '../middlewares/uploadCloud.middleware'
import * as controller from "../controllers/petProduct.controller";
import * as auth from "../middlewares/auth.middleware";


const router: Router = Router();



router.get(
    "/product/:id",
    auth.setUserInfo,
    auth.requireAuth,
    controller.index
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