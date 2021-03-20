import * as yup from 'yup';
import { AppError } from '../../../../errors/AppError';
import { categoriesErrors } from '../../errors';
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async ensureFormatRequest(title: string): Promise<void> {
    const schema = yup.object().shape({
      title: yup.string().required(categoriesErrors.titleRequired),
    });

    try {
      await schema.validate({ title }, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }
  }

  async execute(title: string): Promise<void> {
    const category = await this.categoryRepository.findByTitle(title);

    if (category) throw new AppError(categoriesErrors.categoryAlreadyExists);

    await this.categoryRepository.createCategory(title);
  }
}

export { CreateCategoryUseCase };
