import { Router } from 'express';

const router: Router = Router();

import * as controller from "../../controllers/admin/orderFoodPet.controller";

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.get("/confirm/:email/:id", controller.confirmOrder);
router.delete("/delete/:id", controller.deleteOrder);

export const orderFoodPetRoutes: Router = router;
