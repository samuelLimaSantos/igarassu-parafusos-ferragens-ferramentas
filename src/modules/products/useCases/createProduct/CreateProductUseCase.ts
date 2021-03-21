import { AppError } from '../../../../errors/AppError';
import { ICategoryRepository } from '../../../categories/repositories/interfaces/ICategoryRepository';
import { ITransactionRepository } from '../../../transactions/repositories/interfaces/ITransactionRepository';
import { productErrors } from '../../errors';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

interface IRequest {
  image_id: number;
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price_sell: number;
  price_buy: number;
  description: string;
  category: string;
  user_id: string;
}

class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  private category_id: number ;

  async execute({
    description,
    image_id,
    name,
    price_buy,
    price_sell,
    quantity,
    type,
    unity,
    category,
    user_id,
  }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByTitle(category);

    if (!categoryAlreadyExists) {
      this.category_id = await this.categoryRepository.createCategory(category);
    }

    this.category_id = categoryAlreadyExists ? categoryAlreadyExists.id : this.category_id;

    const productAlreadyExistsInCategory = await this.productRepository.getProductByCategoryAndName(
      name,
      this.category_id,
    );

    if (productAlreadyExistsInCategory) throw new AppError(productErrors.productAlreadyExists);

    const cod = await this.createCodeSerial(this.category_id);

    const productId = await this.productRepository.createProductAndReturnId({
      category_id: this.category_id,
      cod,
      description,
      name,
      price_sell,
      price_buy,
      image_id,
      quantity,
      type,
      unity,
    });

    await this.transactionRepository.createTransaction({
      product_id: productId,
      quantity,
      transaction_type: 'income',
      user_id,
    });
  }

  private async createCodeSerial(category_id: number): Promise<string> {
    const lastItemRegistered = await this.productRepository.getLastProductByCategory(category_id);

    if (!lastItemRegistered) {
      return `${category_id}-1`;
    }

    const [, lastNumber] = lastItemRegistered.cod.split('-');

    return `${category_id}-${Number(lastNumber) + 1}`;
  }
}

export { CreateProductUseCase };
