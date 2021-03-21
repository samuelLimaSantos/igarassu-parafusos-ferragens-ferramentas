import { AppError } from '../../../../errors/AppError';
import { ITransactionRepository } from '../../../transactions/repositories/interfaces/ITransactionRepository';
import { productErrors } from '../../errors';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

interface IRequest {
  user_id: string;
  product_id: string;
  quantity: number;
  transaction_type: 'income' | 'outcome'
}

class UpdateInventoryUseCase {
  constructor(
    private productRepository: IProductRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    user_id,
    product_id,
    quantity,
    transaction_type,
  }: IRequest): Promise<void> {
    const product = await this.productRepository.getProductById(product_id);

    if (!product) throw new AppError(productErrors.productNotFound, 404);

    switch (transaction_type) {
      case 'income':
        product.quantity += quantity;
        break;
      case 'outcome':
        product.quantity -= quantity;
        break;
      default:
        break;
    }

    if (product.quantity <= 0) {
      throw new AppError(productErrors.outcomeMoreThanIncome);
    }

    await this.productRepository.saveProduct(product);

    await this.transactionRepository.createTransaction({
      product_id,
      quantity,
      transaction_type,
      user_id,
    });
  }
}

export { UpdateInventoryUseCase };
