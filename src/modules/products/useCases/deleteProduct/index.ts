import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { DeleteProductController } from './DeleteProductController';
import { DeleteProductUseCase } from './DeleteProductUseCase';

const deleteProductController = (): DeleteProductController => {
  const productRepository = getCustomRepository(ProductRepository);
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  return new DeleteProductController(deleteProductUseCase);
};

export { deleteProductController };
