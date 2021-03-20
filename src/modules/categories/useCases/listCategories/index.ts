import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const listCategoriesController = (): ListCategoriesController => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
  return new ListCategoriesController(listCategoriesUseCase);
};

export { listCategoriesController };
