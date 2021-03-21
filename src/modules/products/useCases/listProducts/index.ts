import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/repositories/implementations/CategoryRepository';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
import { ListProductsController } from './ListProductsController';
import { ListProductsUseCase } from './ListProductsUseCase';

const listProductsController = (): ListProductsController => {
  const productRepository = getCustomRepository(ProductRepository);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const listProductsUseCase = new ListProductsUseCase(productRepository, categoryRepository);
  return new ListProductsController(listProductsUseCase);
};

export { listProductsController };
