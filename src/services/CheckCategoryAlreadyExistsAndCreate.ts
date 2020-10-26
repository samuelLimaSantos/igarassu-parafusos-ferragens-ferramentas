import { getRepository } from 'typeorm';
import CategoryModel from '../models/Categories';

export default class CheckCategoryAlreadyExistsAndCreate {
  async execute(category: string): Promise<string | undefined> {
    const categoryRepository = getRepository(CategoryModel);

    const categoryAlreadyExists = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryAlreadyExists) {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
    }

    const categoryId = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    return categoryId?.id;
  }
}
