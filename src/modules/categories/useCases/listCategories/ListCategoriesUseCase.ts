import { inject, injectable } from 'tsyringe';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.listCategories();

    return categories;
  }
}

export { ListCategoriesUseCase };
