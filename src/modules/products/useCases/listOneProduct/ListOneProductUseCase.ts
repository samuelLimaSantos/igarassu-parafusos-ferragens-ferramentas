import { inject, injectable } from 'tsyringe';
import moment from 'moment';
import { AppError } from '../../../../shared/errors/AppError';
import { productErrors } from '../../errors';
import { Product } from '../../infra/typeorm/entities/Product';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

@injectable()
class ListOneProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new AppError(productErrors.productNotFound, 404);
    }

    moment.locale('pt-br');
    product.created_at = moment(product.created_at).subtract(3, 'hours').format('LLLL');
    product.updated_at = moment(product.updated_at).subtract(3, 'hours').format('LLLL');

    return product;
  }
}

export { ListOneProductUseCase };
