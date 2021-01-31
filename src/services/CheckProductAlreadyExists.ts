import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface CheckProductAlreadyExistsDTO {
  name: string;
}

export default class CheckProductAlreadyExists {
  async execute({ name } :CheckProductAlreadyExistsDTO)
  : Promise<void> {
    const productsRepository = getRepository(ProductsModel);

    const productAlreadyExists = await productsRepository.findOne({
      where: {
        name,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Product already exists.');
    }
  }
}
