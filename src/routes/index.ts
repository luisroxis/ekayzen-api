import { Router } from 'express';
import companyRouter from './company.routes'
import productRouter from './product.routes'

const routes = Router();
routes.use('/companies', companyRouter)
routes.use('/products', productRouter)

routes.get('/', (request, response) => {
  return response.json({msg: 'Desafio eKayzen'})
})


export default routes;