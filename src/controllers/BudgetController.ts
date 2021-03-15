import {request, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../error/AppError';
import * as Yup from 'yup'

import {Budget} from '../database/entities/Budget'
import {Company} from '../database/entities/Company'
import {DetailBudget} from '../database/entities/DetailBudget'
import { Product } from '../database/entities/Product';

class BudgetController {
   /** List */ 
   async index(request: Request, response: Response) {
    const budgetRepository = getRepository(Budget)
    
    const budgets = await budgetRepository.find()

    return response.json(budgets)
    }

    /** Show */ 
  async show(request: Request, response: Response) {
    const budgetRepository = getRepository(Budget)
    const budgetDetailRepository = getRepository(DetailBudget)

    const {id} = request.params

    const budget = await budgetRepository.findOne({
      where: {'id': String(id)}
    })

    const budgetDetails = await budgetDetailRepository.find({
      where: {'budgetId': String(budget?.id)}
    })

    return response.status(201).json({budget, budgetDetails})
    
   }

  /** Create */ 
  async store(request: Request, response: Response) { 
    const companyRepository = getRepository(Company)
    const budgetRepository = getRepository(Product)
    const budgetRepository = getRepository(Budget)
    const budgetDetailRepository = getRepository(DetailBudget)

    const data = request.body;
    /**
     * companySize => 1 Pequeno Porte => 2 Medio Porte => 3 Grande Porte
     * typeSale 1 => Propria
     * typeSale 2 => Parceiro
     * if typeSale !== 1 : taxes => 
     *  if typeSale !== 1 : commission =>
     * 
     */    

    const statusBudget = 1
    let productValue = 0

    const company = await companyRepository.findOne({
      where: {'id': String(data.companyId)}
    })

    let amount = 0

    
    const budget = await budgetRepository.create({
      companyId: data.companyId,
      typeSale: data.typeSale,
      users: data.users,
      taxes: data.taxes,
      commission: data.commission,
      status: statusBudget,
      amount: amount
    })

    await budgetRepository.save(budget)

    data.details.map(async detail => { 
      const product = await productRepository.findOne({
          where: {'id': String(detail.productId)}
        })

        if(company?.size === 1){
          productValue = Number(product?.valuePp)
        } else if(company?.size === 2) {
          productValue = Number(product?.valueMp)
        } else if(company?.size === 3) {
          productValue = Number(product?.valueGp) 
        }

        let valueBudget = productValue * data.users

        

      const detailsBudget = await budgetDetailRepository.create({
        budgetId: budget.id,
        productId: detail.productId,
        value: valueBudget
      })        
      await budgetDetailRepository.save(detailsBudget)

      amount = amount + valueBudget
      })

      setTimeout(async ()=>{        
        const budgetAmount = await budgetRepository.merge(budget,{
          amount: Number(amount)
        })
  
        await budgetRepository.save(budgetAmount)
       
        return response.status(200).json(budgetAmount) 
        
      },1000)            

  }

  /** Update */
  async update( request: Request, response: Response ) { }

  /* Delete */
  async remove(request: Request, response: Response) {
    const budgetRepository = getRepository(Budget)

    const {id} = request.params    

    const budget = await budgetRepository.findOne({
      where: {'id': String(id)}
    })

    if(!budget) {
      throw new AppError('Product not registered')
    }

    const deleted = await budgetRepository.delete({
      id: String(id)
    })

    console.log(deleted)
    if(deleted.affected !== null){     
    return response.send()
    } else {     
      throw new AppError('Budget not deleted')
    }
   }

}

export { BudgetController }