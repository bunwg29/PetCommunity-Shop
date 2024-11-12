import { Router } from 'express'
import multer from 'multer'

import * as controller from "../controllers/blog.controller";
import { authenticateUser } from '../middlewares/auth.middleware';
import * as uploadCloud from '../middlewares/uploadCloud.middleware';

const router: Router = Router();

const upload = multer();

router.get('/', authenticateUser, controller.index);
router.get('/create', authenticateUser, controller.createBlog);
router.post(
    '/create/:id',
    authenticateUser,
    upload.single("thumbnail_photo"),
    uploadCloud.uploadSingle,
    controller.createBlogPost
);
export const blogRoutes: Router = router;