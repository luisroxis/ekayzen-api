import {request, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../error/AppError';
import * as Yup from 'yup'

import {Product} from '../database/entities/Product'
import { Company } from '../database/entities/Company';

class ProductController {
  /** Create */ 
  async store(request: Request, response: Response) {
    const data = request.body;
    const productRepository = getRepository(Product)
    

    const productSchema = Yup.object().shape({
      description:Yup.string().required('Nome Obrigatorio'),
      valuePp:Yup.number().required('Valor Obrigatorio'),
      valueMp:Yup.number().required('Valor Obrigatorio'),
      valueGp:Yup.number().required('Valor Obrigatorio'),
      
    })

    try {
      await productSchema.validate(request.body, {abortEarly: false})
    } catch (err) {
      return response.status(400).json({
        error: err
      })
    }
  
     const product = productRepository.create({
      description: data.description,
      valuePp: data.valuePp,
      valueMp: data.valueMp,
      valueGp: data.valueGp,
    })

    await productRepository.save(product)    

    return response.status(201).json({product});
  }

  /** List */
  async index(request: Request, response: Response) {
    const productRepository = getRepository(Product)

    const products = await productRepository.find()

    return response.json(products)
  }
 

  /** Show */
  async show(request: Request, response: Response) {
    const productRepository = getRepository(Product)
    const companyRepository = getRepository(Company)   

    const { id } = request.params
    const {companyId} = request.query

    const product = await productRepository.findOne({
      where: {'id': String(id)}
    })
    const company = await companyRepository.findOne({
      where: {'id': String(companyId)}
    })      

    if(!product) {
      throw new AppError('Product not found')
    }
    let productValue = 0

    if(company?.size === 1){
      productValue = product.valuePp
    } else if(company?.size === 2) {
      productValue = product.valueMp
    } else if(company?.size === 3) {
      productValue = product.valueGp
    }

    const prod = {}
    prod.id = product.id
    prod.description = product.description
    prod.value = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(productValue)    

    return response.json(prod)
  }

  /** Update */
  async update( request: Request, response: Response ) {
    const productRepository = getRepository(Product)

    const {id} = request.params
    const data = request.body;    

    const product = await productRepository.findOne({
      where: {'id': String(id)}
    })

    if(!product) {
      throw new AppError('Product not registered')
    }
    const productSchema = Yup.object().shape({
      description:Yup.string().required('Nome Obrigatorio'),
      valuePp:Yup.number().required('Valor Obrigatorio'),
      valueMp:Yup.number().required('Valor Obrigatorio'),
      valueGp:Yup.number().required('Valor Obrigatorio'),
      
    })

    try {
      await productSchema.validate(request.body, {abortEarly: false})
    } catch (err) {
      return response.status(400).json({
        error: err
      })
    }
  
     const newProduct = productRepository.merge(
       product,{
      description: data.description,
      valuePp: data.valuePp,
      valueMp: data.valueMp,
      valueGp: data.valueGp,
      }
    )

    await productRepository.save(newProduct)    

    return response.status(201).json({newProduct});
  }

  /* Delete */
  async remove(request: Request, response: Response) {
    const productRepository = getRepository(Product)

    const {id} = request.params    

    const product = await productRepository.findOne({
      where: {'id': String(id)}
    })

    if(!product) {
      throw new AppError('Product not registered')
    }

    const deleted = await productRepository.delete({
      id: String(id)
    })

    
    if(deleted.affected !== null){     
    return response.send()
    } else {     
      throw new AppError('Product not deleted')
    }
  }

}

export { ProductController }