import { Router } from 'express'

import multer from 'multer'

import multerConfig from './config/multer'

import ProductController from './app/controllers/ProductController'

import SessionController from './app/controllers/SessionController'

import UserController from './app/controllers/UserController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

//Adicionando routes.use() com middleware para que todas as rotas abaixo.
//Quando chamado receba o middleware como autenticação
routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)

routes.get('/products', ProductController.index)

export default routes
