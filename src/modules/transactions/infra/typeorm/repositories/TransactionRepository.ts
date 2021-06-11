import {
  getRepository, Repository,
} from 'typeorm';
import moment from 'moment';
import { takePagesTransactions } from '../../../../../shared/utils/Constants';
import { Transaction } from '../entities/Transaction';
import {
  ICreateTransactionDTO,
  IListTransactionsDTO,
  ITransactionRepository,
  IFindTransactionByIdPaginatedResponse,
  IIncomesAndOutcomes,
  IDate,
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
    date,
  }: IListTransactionsDTO): Promise<IFindTransactionByIdPaginatedResponse> {
    let dateCondition = '';

    if (date) {
      moment.locale('pt-br');
      const { startDate, endDate } = date;
      dateCondition = `AND t.created_at BETWEEN '${moment(startDate)
        .subtract(3, 'hours')
        .toDate()
        .toISOString()
        .split('T')[0]} 00:00:00' AND '${moment(endDate)
        .subtract(3, 'hours')
        .toDate()
        .toISOString()
        .split('T')[0]} 23:59:59'`;
    }

    let query = this.repository.createQueryBuilder('transactions')
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
      .where({ product_id });

    if (date) {
      moment.locale('pt-br');
      const { startDate, endDate } = date;

      const startDateFormated = `'${moment(startDate)
        .subtract(3, 'hours')
        .toDate()
        .toISOString()
        .split('T')[0]} 03:01:00'`;

      const endDateFormated = `'${moment(endDate)
        .subtract(3, 'hours')
        .add(1, 'days')
        .toDate()
        .toISOString()
        .split('T')[0]} 03:00:00'`;

      query = query
        .andWhere(`transactions.created_at BETWEEN ${startDateFormated} AND ${endDateFormated}`);
    }

    const [transactions, count] = await query.leftJoin('transactions.user_id', 'users')
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

  async getIncomesAndOutcomesById(product_id: string, date: IDate): Promise<IIncomesAndOutcomes> {
    let dateCondition = '';

    if (date) {
      moment.locale('pt-br');
      const { startDate, endDate } = date;

      const startDateFormated = `'${moment(startDate)
        .subtract(3, 'hours')
        .toDate()
        .toISOString()
        .split('T')[0]} 03:01:00'`;

      const endDateFormated = `'${moment(endDate)
        .subtract(3, 'hours')
        .add(1, 'days')
        .toDate()
        .toISOString()
        .split('T')[0]} 03:00:00'`;

      dateCondition = `AND created_at BETWEEN ${startDateFormated} AND ${endDateFormated}`;
    }

    const responseIncome = await this.repository.query(`
      SELECT
      SUM(quantity)
      FROM transactions
      WHERE product_id = '${product_id}'
      AND transaction_type = 'income' ${dateCondition};`);

    const { sum: incomes } = responseIncome[0];

    const responseOutcome = await this.repository.query(`
      SELECT
      SUM(quantity)
      FROM transactions
      WHERE product_id = '${product_id}'
      AND transaction_type = 'outcome' ${dateCondition};`);

    const { sum: outcomes } = responseOutcome[0];

    return {
      incomes: Number(incomes) || 0,
      outcomes: Number(outcomes) || 0,
    };
  }
}

export { TransactionRepository };
