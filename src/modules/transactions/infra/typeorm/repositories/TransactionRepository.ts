import { EntityRepository, getRepository, Repository } from 'typeorm';
import { takePages } from '../../../../../shared/utils/Constants';
import { Transaction } from '../entities/Transaction';
import {
  ICreateTransactionDTO,
  IListTransactionsDTO,
  ITransactionRepository,
  IFindTransactionByIdPaginatedResponse,
} from '../../../repositories/interfaces/ITransactionRepository';

class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async saveMultipleTransactions(transactions: Transaction[]): Promise<void> {
    await this.repository.save(transactions);
  }

  async saveTransaction(transaction: Transaction): Promise<void> {
    await this.repository.save(transaction);
  }

  async findTransactionByIdPaginated({
    page,
    product_id,
  }: IListTransactionsDTO): Promise<IFindTransactionByIdPaginatedResponse> {
    const [transactions, count] = await this.repository.createQueryBuilder('transactions')
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
    const transaction = this.repository.create({
      user_id,
      product_id,
      quantity,
      transaction_type,
    });

    return transaction;
  }
}

export { TransactionRepository };