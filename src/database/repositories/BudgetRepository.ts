import { EntityRepository, Repository } from 'typeorm'
import { Budget } from '../entities/Budget'

@EntityRepository(Budget)
class BudgetRepository extends Repository<Budget>{

}

export { BudgetRepository }