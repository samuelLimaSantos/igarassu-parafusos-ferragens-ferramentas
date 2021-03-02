import { getRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import ProductsModel from '../models/Products';
import { productErrors } from '../errors/utils/ErrorsDescriptions';

interface CheckProductAlreadyExistsByCategoryDTO {
  name: string;
  categoryId: number;
}

export default class CheckProductAlreadyExistsByCategory {
  async execute({ name, categoryId } :CheckProductAlreadyExistsByCategoryDTO)
  : Promise<void> {
    const productsRepository = getRepository(ProductsModel);

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
