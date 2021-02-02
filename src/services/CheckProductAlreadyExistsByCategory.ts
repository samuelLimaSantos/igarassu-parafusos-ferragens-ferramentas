import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

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
      throw new Error('Product already exists in this category.');
    }
  }
}
