import { Router } from 'express'
import {ProductController} from '../controllers/ProductController'

const productController = new ProductController()
const productRouter = Router()

productRouter.post('/', productController.store)
productRouter.get('/', productController.index)
productRouter.get('/:id', productController.show)
productRouter.put('/:id', productController.update)
productRouter.delete('/:id', productController.remove)

export default productRouter