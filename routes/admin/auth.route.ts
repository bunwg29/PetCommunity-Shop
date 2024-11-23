import { Router } from 'express';

const router: Router = Router();

import * as controller from '../../controllers/admin/auth.controller';

// [GET] admin/signin
router.get('/signin', controller.signin);

// [POST] admin/signin
router.post('/signin', controller.signinPost);

// [POST] admin/logout
router.get('/logout', controller.logout);
export const authAdminRoutes: Router = router;
