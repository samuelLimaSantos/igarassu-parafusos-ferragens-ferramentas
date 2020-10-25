import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';
import CategoryModel from '../models/Categories';

export default class ProductsController {
  async create(request: Request, response: Response) {
    const productsRepository = getRepository(ProductsModel);
    const categoryRepository = getRepository(CategoryModel);

    const {
      cod,
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category,
    } = request.body;

    // Bloco de criar categoria
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
    // Fim bloco de criar categoria

    //  Bloco de verificar se o produto já existe
    const productAlreadyExists = await productsRepository.findOne({
      where: {
        name,
      },
    });

    if (productAlreadyExists) {
      productAlreadyExists.quantity += quantity;
      productsRepository.save(productAlreadyExists);
      return response.status(201).json(productAlreadyExists);
    }

    //  Fim da verificação se o produto já existe

    const quantityOfProductsPerCategory = await productsRepository.find({
      where: {
        category_id: categoryId?.id,
      },
    });

    const code = `${categoryId?.id}/${quantityOfProductsPerCategory.length + 1}`;

    const product = productsRepository.create({
      cod: code,
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category_id: Number(categoryId?.id),
    });

    await productsRepository.save(product);

    return response.status(201).json(product);
  }
}
