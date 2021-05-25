import { container } from 'tsyringe';
import { CategoryRepository } from '../../modules/categories/infra/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../modules/categories/repositories/interfaces/ICategoryRepository';
import { ProductRepository } from '../../modules/products/infra/typeorm/repositories/ProductRepository';
import { IProductRepository } from '../../modules/products/repositories/interfaces/IProductRepository';
import { TransactionRepository } from '../../modules/transactions/infra/typeorm/repositories/TransactionRepository';
import { ITransactionRepository } from '../../modules/transactions/repositories/interfaces/ITransactionRepository';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../../modules/users/repositories/interfaces/IUserRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
