import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { petRoutes } from './pet.route';
import { userRoutes } from './user.route';
import { blogRoutes } from './blog.route';
import { petProductRoutes } from './petProduct.route';
import { cartRoutes } from './cart.route';
import { foodPetRoutes } from './foodpet.route';
import { orderRoutes } from './order.route';

import { checkCartCookies } from '../../middlewares/client/cartToken.middleware';

const Routers = (app: Express): void => {
  app.use(checkCartCookies);
  
  app.use('/', dashboardRoutes);
  app.use('/pet', petRoutes);
  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/mypet', petProductRoutes);
  app.use("/foodpet", foodPetRoutes);
  app.use("/cart", cartRoutes);
  app.use("/order", orderRoutes);
};

export default Routers;
