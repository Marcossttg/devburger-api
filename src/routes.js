import { Router } from 'express'

import multer from 'multer'

import multerConfig from './config/multer'
/* xx */
// import { v4 } from 'uuid'
// import User from './app/models/User'
/* xx */

import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'
// import CategoryController from './app/controllers/CategoryController'
// import OrderController from './app/controllers/OrderController'

// import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

// Adicionando routes.use() com middleware para que todas as rotas abaixo.
// Quando chamado, recebe o middleware como autenticação.
// routes.use(authMiddleware)

// routes.post('/products', upload.single('file'), ProductController.store)
// routes.get('/products', ProductController.index)
// routes.put('/products/:id', upload.single('file'), ProductController.update)

// routes.post('/categories', upload.single('file'), CategoryController.store)
// routes.get('/categories', CategoryController.index)
// routes.put('/categories/:id', upload.single('file'), CategoryController.update)

// routes.post('/orders', OrderController.store)
// routes.put('/orders/:id', OrderController.update)
// routes.get('/orders', OrderController.index)

export default routes
