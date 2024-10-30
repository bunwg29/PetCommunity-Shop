import { Router } from "express";
const router: Router = Router();

import * as controller from '../controllers/category.controller';

router.get('/', controller.index);

export const categoryRoutes: Router = router;