import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/infra/typeorm/repositories/CategoryRepository';
import { TransactionRepository } from '../../../transactions/infra/typeorm/repositories/TransactionRepository';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { CreateProductController } from './CreateProductController';
import { CreateProductUseCase } from './CreateProductUseCase';

const createProductController = (): CreateProductController => {
  const productRepository = getCustomRepository(ProductRepository);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const transactionController = getCustomRepository(TransactionRepository);
  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    categoryRepository,
    transactionController,
  );
  return new CreateProductController(createProductUseCase);
};

export { createProductController };
