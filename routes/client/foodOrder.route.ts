import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/foodOrder.controller';

import * as validate from '../../validates/admin/newOrder.validate';

router.post('/create/:userId', validate.validateInfo, controller.createOrder);
router.get('/success', controller.renderOrderSuccess);

export const orderRoutes: Router = router;
