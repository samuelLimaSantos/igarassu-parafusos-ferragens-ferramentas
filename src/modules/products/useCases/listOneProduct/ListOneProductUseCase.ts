import { inject, injectable } from 'tsyringe';
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

    return product;
  }
}

export { ListOneProductUseCase };
