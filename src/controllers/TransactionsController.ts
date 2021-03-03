import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { productErrors } from '../errors/utils/ErrorsDescriptions';
import { AppError } from '../errors/AppError';
import { TransactionsRepository } from '../repositories/TransactionsRepository';

export default class TransactionsController {
  async index(request: Request, response: Response) : Promise<Response<any>> {
    const { product_id } = request.params;
    const { page } = request.query;

    const pageParse = Number(page);

    const schema = yup.object().shape({
      page: yup.string().required(productErrors.pageRequired),
    });

    try {
      await schema.validate(request.query);
    } catch (error) {
      throw new AppError(error.errors);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionsReport = await transactionsRepository.findAndPaginateById({
      page: pageParse,
      product_id,
    });

    return response.status(200).json({ transactionsReport });
  }
}
