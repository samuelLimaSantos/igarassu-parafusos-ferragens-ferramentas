import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../../categories/infra/typeorm/repositories/CategoryRepository';
import { TransactionRepository } from '../../../transactions/repositories/implementations/TransactionRepository';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
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
