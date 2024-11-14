import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

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
    upload.array("images"),
    uploadCloud.uploadMultiple,
    controller.editPatch
);

export const petProductRoutes: Router = router;