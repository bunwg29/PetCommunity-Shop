import { Express } from 'express'
import { dashboardRoutes } from './dashboard.route'
import { categoryRoutes } from './category.route'
import { userRoutes } from './user.route'
const Routers = (app: Express): void => {
  app.use('/', dashboardRoutes);
  app.use('/category', categoryRoutes);
  app.use('/user', userRoutes);
}

export default Routers
