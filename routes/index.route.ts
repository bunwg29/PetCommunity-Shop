import { Express } from 'express'
import { dashboardRoutes } from './dashboard.route'

const Routers = (app: Express): void => {
  app.use('/', dashboardRoutes)
}

export default Routers
