import {request, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../error/AppError';
import * as Yup from 'yup'

import {Company} from '../database/entities/Company'
import {Address} from '../database/entities/Address'


class CompanyController {
 /** Create */
  async store(request: Request, response: Response) {
    
    const companyRepository = getRepository(Company)
    const addressRepository = getRepository(Address)
    const data = request.body;

    const companyExists = await companyRepository.findOne({
      where: {'cnpj': data.cnpj}
    })


    if(companyExists) {      
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

  /** List */
  async index(request: Request, response: Response) {
    const companyRepository = getRepository(Company)

    const companies = await companyRepository.find()

    return response.json(companies)
  }

  /** Show */
  async show(request: Request, response: Response) {
    const companyRepository = getRepository(Company)
    const addressRepository = getRepository(Address)

    const {id} = request.params

    
    const company = await companyRepository.findOne({
      where: {'id': String(id)}
    })
    const address = await addressRepository.findOne({
      where: {'companyId': String(id)}
    })

    if(!company) {
      throw new AppError('Company not found')
    }

    return response.json({company, address})
  }

  /** Update */
  async update(request: Request, response: Response) {
    const companyRepository = getRepository(Company)
    const addressRepository = getRepository(Address)

    const data = request.body;
    const {id} = request.params    

    const company = await companyRepository.findOne({
      where: {'id': String(id)}
    })

    const address = await addressRepository.findOne({
      where: {'companyId': String(id)}
    })

    if(!company) {
      throw new AppError('Company not registered')
    }
    const companySchema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatorio'),
      email: Yup.string().required('Email Obrigatorio').email(),      
      telephone1: Yup.string().required('Telefone Principal Obrigatorio'),
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
  
    const newCompany = companyRepository.merge(
      company,{
      name: data.name,
      email: data.email,
      telephone1: data.telephone1,
      size: data.size,
      employees: data.employees,
      nameResp: data.nameResp,
      emailResp: data.emailResp,
      telResp: data.telResp
    })

    await companyRepository.save(newCompany)
    
    const newAddressCompany = addressRepository.merge(
      address, {      
      zipCode:data.zipCode,
      address: data.address,
      district: data.district,
      city: data.city,
      state: data.state,
    })

    await addressRepository.save(newAddressCompany)    

    return response.status(201).json({newCompany, newAddressCompany});

  }

  /** Delete */
  async remove(request: Request, response: Response) {
    const companyRepository = getRepository(Company)

    const {id} = request.params    

    const company = await companyRepository.findOne({
      where: {'id': String(id)}
    })

    if(!company) {
      throw new AppError('Company not registered')
    }

    const deleted = await companyRepository.delete({
      id: String(id)
    })

    if(deleted.affected !== null){     
      return response.send()
      } else {     
        throw new AppError('Company not deleted')
      }
  }

}

export { CompanyController }