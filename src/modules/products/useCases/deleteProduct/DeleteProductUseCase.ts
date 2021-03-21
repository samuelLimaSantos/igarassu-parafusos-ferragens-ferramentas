import { AppError } from '../../../../shared/errors/AppError';
import { productErrors } from '../../errors';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.getProductById(id);

    if (!product) throw new AppError(productErrors.productNotFound, 404);

    this.productRepository.deleteProductById(product.id);
  }
}

export { DeleteProductUseCase };
