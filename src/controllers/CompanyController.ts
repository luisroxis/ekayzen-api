import {request, Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../error/AppError';


class CompanyController {
  async store(request: Request, response: Response) {
    const data = request.body;
    

    return response.status(201).json(data);
  }

  async index() {}

  async show() {}

  async update() {}

  async destroy() {}

}

export { CompanyController }