import { getCustomRepository } from 'typeorm';
import { TransactionRepository } from '../../../transactions/infra/typeorm/repositories/TransactionRepository';
import { ProductRepository } from '../../infra/typeorm/repositories/ProductRepository';
import { UpdateInventoryController } from './UpdateInventoryController';
import { UpdateInventoryUseCase } from './UpdateInventoryUseCase';

const updateInventoryController = (): UpdateInventoryController => {
  const productRepository = getCustomRepository(ProductRepository);
  const transactionController = getCustomRepository(TransactionRepository);
  const updateInventoryUseCase = new UpdateInventoryUseCase(
    productRepository,
    transactionController,
  );
  return new UpdateInventoryController(updateInventoryUseCase);
};

export { updateInventoryController };
