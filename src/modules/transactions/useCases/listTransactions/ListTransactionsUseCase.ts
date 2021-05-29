import { inject, injectable } from 'tsyringe';
import moment from 'moment';
import { takePages } from '../../../../shared/utils/Constants';
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

  async execute({ page, product_id }: IListTransactionsDTO): Promise<IListTransactionsResponse> {
    const {
      count,
      transactions,
    } = await this.transactionRepository.findTransactionByIdPaginated({ page, product_id });

    const { outcomes, incomes } = await this.transactionRepository
      .getIncomesAndOutcomesById(product_id);

    const productInventory = await this.productRepository
      .getProductInventoryById(product_id);

    moment.locale('pt-br');

    transactions.forEach((transaction) => {
      transaction.created_at = moment(transaction.created_at).subtract(3, 'hours').format('LLLL');
    });

    const totalPages = Math.ceil(count / takePages);
    return {
      transactions,
      outcomes,
      incomes,
      totalTransactions: count,
      totalTransactionsActualPage: transactions.length,
      totalPages,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
      productActualQuantity: productInventory,
    };
  }
}

export { ListTransactionsUseCase };
