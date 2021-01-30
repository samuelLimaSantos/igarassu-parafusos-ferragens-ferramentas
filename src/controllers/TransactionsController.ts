import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import transactionsModel from '../models/Transactions';

export default class TransactionsController {
  async index(request: Request, response: Response) : Promise<Response<any>> {
    const { product_id } = request.params;

    const transactions = await getRepository(transactionsModel).createQueryBuilder('transactions')
      .where({ product_id })
      .select([
        'transactions.id',
        'transactions.transaction_type',
        'transactions.created_at',
        'transactions.quantity',
        'users.login',
        'products.id',
        'products.name',
        'products.cod',
        'products.quantity',
      ])
      .leftJoin('transactions.user_id', 'users')
      .leftJoin('transactions.product_id', 'products')
      .getMany();

    return response.status(200).json(transactions);
  }
}
