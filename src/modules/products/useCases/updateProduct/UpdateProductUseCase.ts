import { AppError } from '../../../../shared/errors/AppError';
import { ITransactionRepository } from '../../../transactions/repositories/interfaces/ITransactionRepository';
import { productErrors } from '../../errors';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

interface IRequest {
  id: string;
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price_sell: number;
  price_buy: number;
  image_id: number;
  description: string;
  user_id: string;
}

class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    id,
    name,
    quantity,
    type,
    unity,
    price_sell,
    price_buy,
    image_id,
    description,
    user_id,
  }: IRequest): Promise<void> {
    const product = await this.productRepository.getProductById(id);

    if (!product) throw new AppError(productErrors.productNotFound, 404);

    const transaction_type = this.calculateTransactionTypeByQuantity(
      product.quantity,
      quantity,
    );

    if (quantity && quantity !== product.quantity) {
      await this.transactionRepository.createTransaction({
        product_id: product.id,
        user_id,
        quantity: Math.abs(quantity - product.quantity),
        transaction_type,
      });
    }

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.type = type || product.type;
    product.unity = unity || product.unity;
    product.price_buy = price_buy || product.price_buy;
    product.price_sell = price_sell || product.price_sell;
    product.image_id = image_id || product.image_id;
    product.description = description || product.description;

    await this.productRepository.saveProduct(product);
  }

  private calculateTransactionTypeByQuantity(
    actualQuantity: number,
    newQuantity: number,
  ): 'income' | 'outcome' {
    return actualQuantity > newQuantity ? 'outcome' : 'income';
  }
}

export { UpdateProductUseCase };
