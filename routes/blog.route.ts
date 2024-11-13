import { Router } from 'express'
import multer from 'multer'

import * as controller from "../controllers/blog.controller";
import { setUserInfo } from '../middlewares/auth.middleware';
import * as uploadCloud from '../middlewares/uploadCloud.middleware';

const router: Router = Router();

const upload = multer();

router.get('/', setUserInfo, controller.index);
router.get('/create', setUserInfo, controller.createBlog);
router.post(
    '/create/:id',
    setUserInfo,
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.createBlogPost
);
router.get("/:slug/:id", controller.blogDetail);
router.get("/edit/:id", setUserInfo, controller.edit);
router.patch("/edit/:id",setUserInfo, controller.editPatch);

export const blogRoutes: Router = router;