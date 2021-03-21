import { takePages } from '../../../../shared/utils/Constants';
import { IProductRepository } from '../../../products/repositories/interfaces/IProductRepository';
import { IListTransactionsDTO, IListTransactionsResponse, ITransactionRepository } from '../../repositories/interfaces/ITransactionRepository';

class ListTransactionsUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private productRepository: IProductRepository,
  ) {}

  async execute({ page, product_id }: IListTransactionsDTO): Promise<IListTransactionsResponse> {
    const {
      count,
      transactions,
    } = await this.transactionRepository.findTransactionByIdPaginated({ page, product_id });

    const productInventory = await this.productRepository
      .getProductInventoryById(product_id);

    const totalPages = Math.ceil(count / takePages);
    return {
      transactions,
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
