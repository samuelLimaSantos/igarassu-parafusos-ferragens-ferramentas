import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { productErrors } from '../errors/utils/ErrorsDescriptions';
import { ProductsRepository } from '../repositories/ProductsRepository';
import CreateTransactionHistory from './CreateTransactionHistory';

interface IRequestDTO {
  user_id: string;
  quantity: number;
  transaction_type: 'income' | 'outcome';
  product_id: string;
}

export default class UpdateInventoryControl {
  public async execute({
    user_id, quantity, transaction_type, product_id,
  }: IRequestDTO): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOneOrFail({
      where: {
        id: product_id,
      },
    });

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

    await productRepository.save(product);

    const createTransactionHistory = new CreateTransactionHistory();

    await createTransactionHistory.execute({
      product_id,
      quantity,
      transaction_type,
      user_id,
    });
  }
}
