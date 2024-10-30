import { Router } from 'express'
const router: Router = Router()

import * as controller from '../controllers/dashboard.controller'

router.get('/', controller.index)

export const dashboardRoutes: Router = router;
