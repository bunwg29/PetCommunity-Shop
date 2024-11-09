    import { Router } from "express";
    const router: Router = Router();

    import * as controller from '../controllers/category.controller';
    import { authenticateUser } from '../middlewares/auth.middleware'

    router.get('/', authenticateUser, controller.index);
    router.get('/pet/:slug', authenticateUser, controller.petDetail);
    export const categoryRoutes: Router = router;