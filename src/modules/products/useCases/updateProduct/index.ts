import { getCustomRepository } from 'typeorm';
import { TransactionRepository } from '../../../transactions/repositories/implementations/TransactionRepository';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
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
