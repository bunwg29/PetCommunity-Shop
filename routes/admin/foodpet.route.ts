import { Router } from "express";

import * as controller from "../../controllers/admin/foodpet.controller";


const router: Router = Router();

router.get("/", controller.index);

export const petFoodRoutes: Router = router;