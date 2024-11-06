import { Router } from 'express'
const router: Router = Router()

import * as controller from '../controllers/dashboard.controller'
import { authenticateUser } from '../middlewares/auth.middleware'
router.get('/', authenticateUser, controller.index)

export const dashboardRoutes: Router = router;
