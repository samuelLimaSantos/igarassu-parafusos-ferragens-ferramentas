import { EntityRepository, Repository } from 'typeorm';
import { takePages } from '../../../../shared/utils/Constants';
import { Transaction } from '../../model/Transaction';
import {
  ICreateTransactionDTO,
  IListTransactionsDTO,
  ITransactionRepository,
  IFindTransactionByIdPaginatedResponse,
} from '../interfaces/ITransactionRepository';

@EntityRepository(Transaction)
class TransactionRepository extends Repository<Transaction> implements ITransactionRepository {
  async saveMultipleTransactions(transactions: Transaction[]): Promise<void> {
    await this.save(transactions);
  }

  async saveTransaction(transaction: Transaction): Promise<void> {
    await this.save(transaction);
  }

  async findTransactionByIdPaginated({
    page,
    product_id,
  }: IListTransactionsDTO): Promise<IFindTransactionByIdPaginatedResponse> {
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

    return { transactions, count };
  }

  createTransaction({
    product_id,
    quantity,
    transaction_type,
    user_id,
  }: ICreateTransactionDTO): Transaction {
    const transaction = this.create({
      user_id,
      product_id,
      quantity,
      transaction_type,
    });

    return transaction;
  }
}

export { TransactionRepository };
