import { Category } from '../../model/Category';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoryRepository.listCategories();

    return categories;
  }
}

export { ListCategoriesUseCase };
