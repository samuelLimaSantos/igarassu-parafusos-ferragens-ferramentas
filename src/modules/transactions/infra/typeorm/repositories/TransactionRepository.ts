import { getRepository, Repository } from 'typeorm';
import { takePagesTransactions } from '../../../../../shared/utils/Constants';
import { Transaction } from '../entities/Transaction';
import {
  ICreateTransactionDTO,
  IListTransactionsDTO,
  ITransactionRepository,
  IFindTransactionByIdPaginatedResponse,
  IIncomesAndOutcomes,
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
        'products.image_id',
        'products.unity',
      ])
      .leftJoin('transactions.user_id', 'users')
      .leftJoin('transactions.product_id', 'products')
      .skip(page === 1 ? 0 : (page - 1) * takePagesTransactions)
      .take(takePagesTransactions)
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

  async getIncomesAndOutcomesById(product_id: string): Promise<IIncomesAndOutcomes> {
    const { sum: incomes } = await this.repository
      .createQueryBuilder()
      .select('SUM(quantity)', 'sum')
      .where({
        product_id,
        transaction_type: 'income',
      })
      .getRawOne();

    const { sum: outcomes } = await this.repository
      .createQueryBuilder()
      .select('SUM(quantity)', 'sum')
      .where({
        product_id,
        transaction_type: 'outcome',
      })
      .getRawOne();

    return {
      incomes: incomes || 0,
      outcomes: outcomes || 0,
    };
  }
}

export { TransactionRepository };
