import {request, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../error/AppError';
import * as Yup from 'yup'

import {Company} from '../database/entities/Company'
import {Address} from '../database/entities/Address'
import { validate } from 'uuid';


class CompanyController {
 
  async store(request: Request, response: Response) {
    const data = request.body;
    const companyRepository = getRepository(Company)
    const addressRepository = getRepository(Address)
    const companyExists = await companyRepository.findOne({
      where: {'cnpj': data.cnpj}
    })


    if(companyExists) {
      console.log(companyExists.id)
      
      const address = await addressRepository.findOne({
        where: {'id': String(companyExists.id)}
      })

      console.log(address)
      throw new AppError('Company already registered')
    }

    const companySchema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatorio'),
      email: Yup.string().required('Email Obrigatorio').email(),      
      telephone1: Yup.string().required('Telefone Principal Obrigatorio'),
      cnpj: Yup.string().required('CNPJ Obrigatorio'),
      size: Yup.number().required('Tamanho da Empresa Obrigatorio'),
      employees: Yup.number().required('Quantidade de Funcionarios Obrigatorio'),
      nameResp: Yup.string().required('Nome de Responsavel Obrigatorio'),
      emailResp: Yup.string().required('Email do Responsavel Obrigatorio').email(),
      telResp: Yup.string().required('Telefone Responsavel Obrigatorio'),
      zipCode: Yup.string().required('CEP Obrigatorio'),
      address: Yup.string().required('Endereço Obrigatorio'),
      district: Yup.string().required('Bairro Obrigatorio'),
      city: Yup.string().required('Cidade Obrigatorio'),
      state: Yup.string().required('Estado Obrigatorio')
    })

    try {
      await companySchema.validate(request.body, {abortEarly: false})
    } catch (err) {
      return response.status(400).json({
        error: err
      })
    }
  
    const company = companyRepository.create({
      name: data.name,
      email: data.email,
      telephone1: data.telephone1,
      cnpj: data.cnpj,
      size: data.size,
      employees: data.employees,
      nameResp: data.nameResp,
      emailResp: data.emailResp,
      telResp: data.telResp
    })

    await companyRepository.save(company)
    console.log(company.id)
    
    const addressCompany = addressRepository.create({
      companyId: String(company.id),
      zipCode:data.zipCode,
      address: data.address,
      district: data.district,
      city: data.city,
      state: data.state,
    })

    await addressRepository.save(addressCompany)    

    return response.status(201).json({company, addressCompany});
  }

  async index(request: Request, response: Response) {
    const companyRepository = getRepository(Company)

    const companies = await companyRepository.find()

    return response.json(companies)
  }

  async show(request: Request, response: Response) {
    const companyRepository = getRepository(Company)

    const {id} = request.params

    const companySchema = Yup.object().shape({
      id: Yup.string().required('ID Obrigatorio').uuid()
    })

    try {
      await companySchema.validate(request.body, {abortEarly: false})
    } catch (err) {
      return response.status(400).json({
        error: err
      })
    }

    const company = await companyRepository.findOne({
      where: {'id': String(id)}
    })

    if(!company) {
      throw new AppError('Company not found')
    }

    return response.json(company)
  }

  async update() {}

  async remove(request: Request, response: Response) {
    const companyRepository = getRepository(Company)

    const {id} = request.params    

    const company = await companyRepository.findOne({
      where: {'id': String(id)}
    })

    if(!company) {
      throw new AppError('Company not registered')
    }

    await companyRepository.delete({
      id: String(id)
    })

    return response.status(200)
  }

}

export { CompanyController }