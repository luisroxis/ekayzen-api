import { Router } from 'express'
import {CompanyController} from '../controllers/CompanyController'

const companyController = new CompanyController()
const companyRouter = Router()

companyRouter.post('/', companyController.store)
companyRouter.get('/', companyController.index)
companyRouter.get('/:id', companyController.show)
companyRouter.put('/:id', companyController.update)
companyRouter.delete('/:id', companyController.destroy)

export default companyRouter