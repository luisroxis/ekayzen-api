import { Router, RouterOptions } from 'express';
const routes = Router();

routes.get('/', (request, response) => {
  return response.json({msg: 'Desafio eKayzen'})
})


export default routes;