import { Router } from 'express'
const router: Router = Router()

import * as controller from '../../controllers/client/dashboard.controller'
import { setUserInfo } from '../../middlewares/client/authAccount.middleware'
router.get('/', setUserInfo, controller.index)

export const dashboardRoutes: Router = router
