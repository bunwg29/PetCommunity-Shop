import { Router } from 'express'
const router: Router = Router()

import * as controller from '../controllers/category.controller'
import { setUserInfo } from '../middlewares/authAccount.middleware'

router.get('/', setUserInfo, controller.index)
router.get('/pet/:slug', setUserInfo, controller.petDetail)
export const categoryRoutes: Router = router
