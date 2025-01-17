import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/toypet.controller';
import { setUserInfo } from '../../middlewares/client/authAccount.middleware';

router.get('/', setUserInfo, controller.index);
router.get('/detail/:slug/:id', setUserInfo, controller.detail);
export const toyPetRoutes: Router = router;
