import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/repositories/implementations/CategoryRepository';
import { TransactionRepository } from '../../../transactions/repositories/implementations/TransactionRepository';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
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
