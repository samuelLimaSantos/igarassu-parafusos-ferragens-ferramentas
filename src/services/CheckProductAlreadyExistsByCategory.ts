import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { productErrors } from '../errors/utils/ErrorsDescriptions';
import { ProductsRepository } from '../repositories/ProductsRepository';

interface CheckProductAlreadyExistsByCategoryDTO {
  name: string;
  categoryId: number;
}

export default class CheckProductAlreadyExistsByCategory {
  async execute({ name, categoryId } :CheckProductAlreadyExistsByCategoryDTO)
  : Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productAlreadyExists = await productsRepository.findOne({
      where: {
        name,
        category_id: categoryId,
      },
    });

    if (productAlreadyExists) {
      throw new AppError(productErrors.productAlreadyExists);
    }
  }
}
