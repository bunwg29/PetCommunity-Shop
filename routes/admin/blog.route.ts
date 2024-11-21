import { Router } from "express";
import multer from "multer";

const router: Router = Router();

import * as controller from "../../controllers/admin/blog.controller";
import * as uploadCloud from '../../middlewares/client/uploadCloud.middleware'

const upload = multer();

router.get("/", controller.index);
router.get("/detail/:id", controller.blogDetail);
router.patch(
    "/edit/:id",
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.blogPatch
);

router.delete(
    "/delete/:id",
    controller.deleteBlog
)

export const blogAdminRoutes: Router = router;