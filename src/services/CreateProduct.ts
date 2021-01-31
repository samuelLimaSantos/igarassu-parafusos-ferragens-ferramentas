import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface Request {
  cod: string;
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price: number;
  description: string;
  category_id: number;
}

export default class CreateProduct {
  public async execute({
    cod,
    name,
    quantity,
    type,
    unity,
    price,
    description,
    category_id,
  } : Request): Promise<ProductsModel> {
    const productsRepository = getRepository(ProductsModel);

    const product = productsRepository.create({
      cod,
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category_id,
      transaction_type: 'income',
    });

    await productsRepository.save(product);

    return product;
  }
}