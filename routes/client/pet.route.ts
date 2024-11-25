import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/pet.controller';
import { setUserInfo } from '../../middlewares/client/authAccount.middleware';

router.get('/', setUserInfo, controller.index);
router.get('/:slug', setUserInfo, controller.petDetail);
export const petRoutes: Router = router;
