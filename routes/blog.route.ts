import { Router } from 'express'

import * as controller from "../controllers/blog.controller";

const router: Router = Router();

router.get('/', controller.index);

export const blogRoutes: Router = router;