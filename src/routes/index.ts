import { Router } from 'express';
import companyRouter from './company.routes'

const routes = Router();
routes.use('/companies', companyRouter)

routes.get('/', (request, response) => {
  return response.json({msg: 'Desafio eKayzen'})
})


export default routes;