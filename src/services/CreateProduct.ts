import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';

interface Request {
  cod: string;
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price_sell: number;
  price_buy: number;
  image_id: number;
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
    description,
    category_id,
    price_buy,
    price_sell,
    image_id,
  } : Request): Promise<ProductsModel> {
    const productsRepository = getRepository(ProductsModel);

    const product = productsRepository.create({
      cod,
      name,
      quantity,
      type,
      unity,
      description,
      category_id,
      image_id,
      price_sell,
      price_buy,

    });

    await productsRepository.save(product);

    return product;
  }
}
