import { Router } from 'express';
const router: Router = Router();

import * as controller from "../../controllers/client/order.controller";

import * as validate from "../../validates/admin/newOrder.validate";

router.post("/create/:userId", controller.createOrder);
router.get("/success", validate.validateInfo, controller.renderOrderSuccess);

export const orderRoutes: Router = router;
