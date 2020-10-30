import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface CheckProductAlreadyExistsDTO {
  name: string;
  quantity: number;
}

export default class CheckProductAlreadyExists {
  async execute({ name, quantity } :CheckProductAlreadyExistsDTO)
  : Promise<void> {
    const productsRepository = getRepository(ProductsModel);

    const productAlreadyExists = await productsRepository.findOne({
      where: {
        name,
      },
    });

    if (productAlreadyExists) {
      productAlreadyExists.quantity += quantity;
      productsRepository.save(productAlreadyExists);
      throw new Error('Product already exists and quantity was incremented.');
    }
  }
}
