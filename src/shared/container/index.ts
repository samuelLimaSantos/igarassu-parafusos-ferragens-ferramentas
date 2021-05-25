import { container } from 'tsyringe';
import { CategoryRepository } from '../../modules/categories/infra/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../modules/categories/repositories/interfaces/ICategoryRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);
