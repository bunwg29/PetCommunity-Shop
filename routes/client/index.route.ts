import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
import { petRoutes } from './pet.route';
import { userRoutes } from './user.route';
import { blogRoutes } from './blog.route';
import { petProductRoutes } from './petProduct.route';
import { cartRoutes } from './foodCart.route';
import { foodPetRoutes } from './foodpet.route';
import { orderRoutes } from './foodOrder.route';
import { toyPetRoutes } from './toypet.route';
import { cartToyRoutes } from './toycart.route';
import { toyOrderRoutes } from './toyOrder.route';
import { cookiesCart } from '../../middlewares/client/cartCookies.middleware';

const Routers = (app: Express): void => {
  app.use(cookiesCart);
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
};

export default Routers;
