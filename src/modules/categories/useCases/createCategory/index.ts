import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const createCategoryController = (): CreateCategoryController => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  return new CreateCategoryController(createCategoryUseCase);
};

export { createCategoryController };
