import { Router } from 'express'
const router: Router = Router()

import * as controller from '../controllers/dashboard.controller'
import { setUserInfo } from '../middlewares/auth.middleware'
router.get('/', setUserInfo, controller.index)

export const dashboardRoutes: Router = router
