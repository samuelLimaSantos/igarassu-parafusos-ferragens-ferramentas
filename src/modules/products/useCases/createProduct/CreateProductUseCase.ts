import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
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

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('TransactionRepository')
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
      const categoryModel = this.categoryRepository.createCategory(category);
      await this.categoryRepository.saveCategory(categoryModel);
      this.category_id = categoryModel.id;
    }

    this.category_id = categoryAlreadyExists ? categoryAlreadyExists.id : this.category_id;

    const productAlreadyExistsInCategory = await this.productRepository.getProductByCategoryAndName(
      name,
      this.category_id,
    );

    if (productAlreadyExistsInCategory) throw new AppError(productErrors.productAlreadyExists);

    const cod = await this.createCodeSerial(this.category_id);

    const product = {
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
    };

    const productModel = this.productRepository.createProduct(product);

    await this.productRepository.saveProduct(productModel);

    const transaction = this.transactionRepository.createTransaction({
      product_id: productModel.id,
      quantity,
      transaction_type: 'income',
      user_id,
    });

    await this.transactionRepository.saveTransaction(transaction);
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
