import { getCustomRepository } from 'typeorm';
import { TransactionRepository } from '../../../transactions/infra/typeorm/repositories/TransactionRepository';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { UpdateProductController } from './UpdateProductController';
import { UpdateProductUseCase } from './UpdateProductUseCase';

const updateProductController = (): UpdateProductController => {
  const productRepository = getCustomRepository(ProductRepository);
  const transactionController = getCustomRepository(TransactionRepository);
  const updateProductUseCase = new UpdateProductUseCase(
    productRepository,
    transactionController,
  );
  return new UpdateProductController(updateProductUseCase);
};

export { updateProductController };
