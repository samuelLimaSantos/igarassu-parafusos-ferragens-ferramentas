import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
import { ListProductsController } from './ListProductsController';
import { ListProductsUseCase } from './ListProductsUseCase';

const listProductsController = (): ListProductsController => {
  const productRepository = getCustomRepository(ProductRepository);
  const listProductsUseCase = new ListProductsUseCase(productRepository);
  return new ListProductsController(listProductsUseCase);
};

export { listProductsController };
