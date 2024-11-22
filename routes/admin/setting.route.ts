import { Router } from 'express';

const router: Router = Router();

import * as controller from '../../controllers/admin/setting.controller';

router.get('/', controller.index);

export const settingAdminRoutes: Router = router;
