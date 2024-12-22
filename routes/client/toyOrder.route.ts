import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/toyOrder.controller';

import * as validate from '../../validates/admin/newOrder.validate';
import { setUserInfo } from '../../middlewares/client/authAccount.middleware';

router.post('/create/:userId', setUserInfo, validate.validateInfo, controller.createOrder);
router.get('/success', setUserInfo, controller.renderOrderSuccess);

export const toyOrderRoutes: Router = router;
