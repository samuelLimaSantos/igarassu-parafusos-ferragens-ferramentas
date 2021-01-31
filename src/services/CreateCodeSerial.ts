import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface CodeSerialDTO {
  categoryId: string | undefined;
}

export default class CreateCodeSerial {
  async execute({ categoryId }: CodeSerialDTO): Promise<string> {
    const productsRepository = getRepository(ProductsModel);

    const lastItemRegistered = await productsRepository.findOne({
      where: {
        category_id: categoryId,
      },
      order: {
        created_at: 'DESC',
      },
    });

    if (!lastItemRegistered) {
      return `${categoryId}-1`;
    }

    const [, lastNumber] = lastItemRegistered?.cod.split('-');

    return `${categoryId}-${Number(lastNumber) + 1}`;
  }
}
