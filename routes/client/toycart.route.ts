import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/toyCart.controller';
import { setUserInfo } from '../../middlewares/client/authAccount.middleware';

router.get('/', setUserInfo, controller.index);
router.get('/add/:productId/:quantity', controller.createCart);
router.get('/update/reduce/:productId/:quantity', controller.reduceItem);
router.get('/update/add/:productId/:quantity', controller.addItem);
router.get('/delete/:productId', controller.deleteProduct);
export const cartToyRoutes: Router = router;
