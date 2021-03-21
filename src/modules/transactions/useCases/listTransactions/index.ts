import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../../../products/repositories/implementations/ProductRepository';
import { TransactionRepository } from '../../repositories/implementations/TransactionRepository';
import { ListTransactionsController } from './ListTransactionsController';
import { ListTransactionsUseCase } from './ListTransactionsUseCase';

const listTransactionsController = (): ListTransactionsController => {
  const productRepository = getCustomRepository(ProductRepository);
  const transactionRepository = getCustomRepository(TransactionRepository);
  const listTransactionUseCase = new ListTransactionsUseCase(
    transactionRepository,
    productRepository,
  );
  return new ListTransactionsController(listTransactionUseCase);
};

export { listTransactionsController };
