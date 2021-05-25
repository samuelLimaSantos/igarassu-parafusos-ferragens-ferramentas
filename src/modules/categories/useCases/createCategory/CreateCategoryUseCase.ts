import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { categoriesErrors } from '../../errors';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(title: string): Promise<void> {
    const category = await this.categoryRepository.findByTitle(title);

    if (category) throw new AppError(categoriesErrors.categoryAlreadyExists);

    const categoryModel = this.categoryRepository.createCategory(title);

    await this.categoryRepository.saveCategory(categoryModel);
  }
}

export { CreateCategoryUseCase };
