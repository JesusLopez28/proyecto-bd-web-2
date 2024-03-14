import express from 'express'
import CategoryRouter from './category.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import ProductRouter from './product.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', CategoryRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
  router.use('/products', ProductRouter)
}

export default routerApi
