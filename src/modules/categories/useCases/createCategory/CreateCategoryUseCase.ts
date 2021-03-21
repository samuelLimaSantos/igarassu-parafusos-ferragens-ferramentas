import { AppError } from '../../../../shared/errors/AppError';
import { categoriesErrors } from '../../errors';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(title: string): Promise<void> {
    const category = await this.categoryRepository.findByTitle(title);

    if (category) throw new AppError(categoriesErrors.categoryAlreadyExists);

    await this.categoryRepository.createCategory(title);
  }
}

export { CreateCategoryUseCase };
