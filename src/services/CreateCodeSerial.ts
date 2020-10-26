import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface CodeSerialDTO {
  categoryId: string | undefined;
}

export default class CreateCodeSerial {
  async execute({ categoryId }: CodeSerialDTO): Promise<string> {
    const productsRepository = getRepository(ProductsModel);

    const quantityOfProductsPerCategory = await productsRepository.find({
      where: {
        category_id: categoryId,
      },
    });

    const code = `${categoryId}/${quantityOfProductsPerCategory.length + 1}`;

    return code;
  }
}
