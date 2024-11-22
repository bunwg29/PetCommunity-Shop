import { Express } from 'express';
import { dashboardRoutes } from './dashboard.route';
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
};

export default Routers;
