import { Express } from 'express'
import { dashboardRoutes } from './dashboard.route'
import { categoryRoutes } from './category.route'

const Routers = (app: Express): void => {
  app.use('/', dashboardRoutes);
  app.use('/category', categoryRoutes);
}

export default Routers
