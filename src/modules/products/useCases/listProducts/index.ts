import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/infra/typeorm/repositories/CategoryRepository';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { ListProductsController } from './ListProductsController';
import { ListProductsUseCase } from './ListProductsUseCase';

const listProductsController = (): ListProductsController => {
  const productRepository = getCustomRepository(ProductRepository);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const listProductsUseCase = new ListProductsUseCase(productRepository, categoryRepository);
  return new ListProductsController(listProductsUseCase);
};

export { listProductsController };
