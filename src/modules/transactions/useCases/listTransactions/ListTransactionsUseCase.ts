import { inject, injectable } from 'tsyringe';
import moment from 'moment';
import { takePagesTransactions } from '../../../../shared/utils/Constants';
import { IProductRepository } from '../../../products/repositories/interfaces/IProductRepository';
import { IListTransactionsDTO, IListTransactionsResponse, ITransactionRepository } from '../../repositories/interfaces/ITransactionRepository';

@injectable()
class ListTransactionsUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    page,
    product_id,
    date,
  }: IListTransactionsDTO): Promise<IListTransactionsResponse> {
    const {
      count,
      transactions,
    } = await this.transactionRepository.findTransactionByIdPaginated({ page, product_id, date });

    const { outcomes, incomes } = await this.transactionRepository
      .getIncomesAndOutcomesById(product_id, date);

    const productInventory = await this.productRepository
      .getProductInventoryById(product_id);

    moment.locale('pt-br');

    transactions.forEach((transaction) => {
      transaction.created_at = moment(transaction.created_at).subtract(3, 'hours').format('LLLL');
    });

    const totalPages = Math.ceil(count / takePagesTransactions);
    return {
      transactions,
      outcomes,
      incomes,
      totalTransactions: count,
      totalTransactionsActualPage: transactions.length,
      totalPages: totalPages === 0 ? 1 : totalPages,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
      productActualQuantity: productInventory,
    };
  }
}

export { ListTransactionsUseCase };
