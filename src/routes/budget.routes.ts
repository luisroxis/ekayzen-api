import { Router } from 'express'
import {BudgetController} from '../controllers/BudgetController'

const budgetController = new BudgetController()
const budgetRouter = Router()

budgetRouter.post('/', budgetController.store)
budgetRouter.get('/', budgetController.index)
budgetRouter.get('/:id', budgetController.show)
budgetRouter.put('/:id', budgetController.update)
budgetRouter.delete('/:id', budgetController.remove)

export default budgetRouter