import { Router } from "express";
import multer from "multer";

import * as uploadCloud from '../../middlewares/client/uploadCloud.middleware'

import * as controller from "../../controllers/admin/toypet.controller";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});

const router: Router = Router();

router.get("/", controller.index);

router.get(
    "/create",
    controller.create
);

router.post(
    "/create",
    upload.fields([
        { name: "avt", maxCount: 1 }, 
        { name: "images" }, 
    ]),
    uploadCloud.uploadMultipeTypeForm,
    controller.createPost
);

router.get("/detail/:id", controller.toyPetDetail);

router.patch(
    "/edit/detail/:id",
    upload.fields([
        { name: "avt", maxCount: 1 }, 
        { name: "images" }, 
    ]),
    uploadCloud.uploadMultipeTypeForm,
    controller.toyPetDetailPatch
);

router.delete(
    "/delete/image/:image(*)/:id",
    controller.deleteImages
);

router.delete(
    "/delete/:id",
    controller.deletePet
);

export const toyPetRoutes: Router = router;