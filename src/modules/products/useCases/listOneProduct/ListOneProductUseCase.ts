import { AppError } from '../../../../errors/AppError';
import { productErrors } from '../../errors';
import { Product } from '../../model/Product';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

class ListOneProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new AppError(productErrors.productNotFound, 404);
    }

    return product;
  }
}

export { ListOneProductUseCase };