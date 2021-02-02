import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import transactionsModel from '../models/Transactions';
import productModel from '../models/Products';

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
      ])
      .leftJoin('transactions.user_id', 'users')
      .leftJoin('transactions.product_id', 'products')
      .getMany();

    const responseQuantity = await getRepository(productModel).findOne({
      select: ['id', 'quantity'],
      where: {
        id: product_id,
      },
    });

    return response.status(200).json({ transactions, quantity: responseQuantity?.quantity });
  }
}
