import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import TransactionModel from '../models/Transactions';
import { takePages } from '../utils/Constants';
import { ProductsRepository } from './ProductsRepository';

interface FindAndPaginateByIdProps {
  product_id: string;
  page: number;
}

interface FindPaginateAndPaginateByIdResponse {
  transactions: TransactionModel[];
  totalTransactions: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
  totalTransactionsActualPage: number;
  productActualQuantity: number | undefined;
}

@EntityRepository(TransactionModel)
class TransactionsRepository extends Repository<TransactionModel> {
  public async findAndPaginateById({
    product_id,
    page,
  }: FindAndPaginateByIdProps): Promise<FindPaginateAndPaginateByIdResponse> {
    const [transactions, count] = await this.createQueryBuilder('transactions')
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
      .skip(page === 1 ? 0 : (page - 1) * takePages)
      .take(takePages)
      .orderBy('transactions.created_at', 'DESC')
      .getManyAndCount();

    const responseQuantity = await getCustomRepository(ProductsRepository).findOne({
      select: ['id', 'quantity'],
      where: {
        id: product_id,
      },
    });

    const totalPages = Math.ceil(count / takePages);
    return {
      transactions,
      totalTransactions: count,
      totalTransactionsActualPage: transactions.length,
      totalPages,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
      productActualQuantity: responseQuantity?.quantity,
    };
  }
}
export {
  TransactionsRepository,
};
