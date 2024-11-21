import { Router } from "express";
import multer from "multer";

import * as controller from "../../controllers/admin/pet.controller"
import * as uploadCloud from '../../middlewares/client/uploadCloud.middleware'

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});

const router: Router = Router();
// [GET] admin/pet
router.get("/", controller.index);

// [GET] admin/pet/detail/:id
router.get("/detail/:id", controller.petDetail);

// [PATCH] admin/pet/edit/:id
router.patch(
    "/edit/:id",
    upload.fields([
        { name: "avt", maxCount: 1 }, 
        { name: "images" }, 
    ]),
    uploadCloud.uploadMultipeTypeForm,
    controller.petPatch
);

// [DELETE] admin/pet/delete/:id
router.delete(
    "/delete/:id",
    controller.deletePet
)

router.delete(
    "/delete/image/:image(*)/:id",
    controller.deleteImages
);



export const petAdminRoutes: Router = router;
