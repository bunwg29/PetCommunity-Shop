import { Router } from 'express'
import multer from 'multer'

import * as controller from "../controllers/blog.controller";
import { authenticateUser } from '../middlewares/auth.middleware';
import * as uploadCloud from '../middlewares/uploadCloud.middleware';

const router: Router = Router();

const upload = multer();

router.get('/', controller.index);
router.get('/create', authenticateUser, controller.createBlog);
router.post(
    '/create/:id',
    authenticateUser,
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.createBlogPost
);
router.get("/:slug/:id", controller.blogDetail);
router.get("/edit/:id", authenticateUser, controller.edit);
router.patch("/edit/:id",authenticateUser, controller.editPatch);

export const blogRoutes: Router = router;