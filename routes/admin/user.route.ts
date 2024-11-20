import { Router } from "express";
import multer from 'multer'

const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";
import { validateEditProfile } from '../../validates/editProfile.validate'
import * as uploadCloud from '../../middlewares/uploadCloud.middleware'

const upload = multer();

// [GET] admin/user
router.get("/", controller.index);

// [GET] admin/user/detail:id
router.get(
    "/detail/:id",
    controller.detail
);

// [PATCH] admin/user/edit/detail/id
router.patch(
    "/detail/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.detailPatch
);

router.delete(
    "/delete/:id",
    controller.deleteUser   
)


export const userAdminRoutes: Router = router;