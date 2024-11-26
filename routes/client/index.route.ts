import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
<<<<<<< HEAD
import { categoryRoutes } from './category.route';
import { userRoutes } from './user.route';
import { blogRoutes } from './blog.route';
import { petProductRoutes } from './petProduct.route';

const Routers = (app: Express): void => {
  app.use('/', dashboardRoutes);
  app.use('/category', categoryRoutes);
  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/mypet', petProductRoutes);
=======
import { petRoutes } from './pet.route';
import { userRoutes } from './user.route';
import { blogRoutes } from './blog.route';
import { petProductRoutes } from './petProduct.route';
import { cartRoutes } from './cart.route';
import { foodPetRoutes } from './foodpet.route';
import { orderRoutes } from './order.route';
import { toyPetRoutes } from './toypet.route';
import { cartToyRoutes } from './toycart.route';
import { toyOrderRoutes } from './toyOrder.route';

import { checkCartCookies } from '../../middlewares/client/cartToken.middleware';

const Routers = (app: Express): void => {
  app.use(checkCartCookies);

  app.use('/', dashboardRoutes);
  app.use('/pet', petRoutes);
  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/mypet', petProductRoutes);
  app.use('/foodpet', foodPetRoutes);
  app.use('/toypet', toyPetRoutes);
  app.use('/cart', cartRoutes);
  app.use('/toycart', cartToyRoutes);
  app.use('/order', orderRoutes);
  app.use('/toyorder', toyOrderRoutes);
>>>>>>> 10/client
};

export default Routers;
