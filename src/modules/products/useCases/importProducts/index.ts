import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/infra/typeorm/repositories/CategoryRepository';
import { TransactionRepository } from '../../../transactions/infra/typeorm/repositories/TransactionRepository';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { ImportProductsController } from './ImportProductsController';
import { ImportProductsUseCase } from './ImportProductsUseCase';

const importProductsController = (): ImportProductsController => {
  const productRepository = getCustomRepository(ProductRepository);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const transactionController = getCustomRepository(TransactionRepository);
  const importProductUseCase = new ImportProductsUseCase(
    productRepository,
    categoryRepository,
    transactionController,
  );
  return new ImportProductsController(importProductUseCase);
};

export { importProductsController };
