import { AppError } from '../../../../errors/AppError';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(title: string): Promise<void> {
    const category = await this.categoryRepository.findByTitle(title);

    if (category) throw new AppError('Categoria já cadastrada');

    await this.categoryRepository.createCategory(title);
  }
}

export { CreateCategoryUseCase };
