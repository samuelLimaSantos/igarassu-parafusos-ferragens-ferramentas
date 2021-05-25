import { container } from 'tsyringe';
import { CategoryRepository } from '../../modules/categories/infra/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../modules/categories/repositories/interfaces/ICategoryRepository';
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
