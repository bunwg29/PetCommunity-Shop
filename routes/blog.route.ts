import { Router } from 'express'
import multer from 'multer'

import * as controller from "../controllers/blog.controller";
import * as auth from '../middlewares/authAccount.middleware';
import * as uploadCloud from '../middlewares/uploadCloud.middleware';

const router: Router = Router();

const upload = multer();

router.get('/', auth.setUserInfo, controller.index);
router.get('/create', auth.setUserInfo, controller.createBlog);
router.post(
    '/create/:id',
    auth.setUserInfo,
    auth.requireAuth,
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.createBlogPost
);

router.get("/myblog/:id", auth.setUserInfo, auth.requireAuth, controller.myBlog);
router.get("/petBlog/:slug/:id", auth.setUserInfo, controller.blogDetail);
router.get("/edit/:id",  auth.setUserInfo, auth.requireAuth, controller.edit);
router.patch(
    "/edit/:id",
    auth.setUserInfo,
    auth.requireAuth,
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.editPatch
);


export const blogRoutes: Router = router;