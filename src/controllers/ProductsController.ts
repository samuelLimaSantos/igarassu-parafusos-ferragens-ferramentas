import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';
import CategoriesModel from '../models/Categories';
import CheckCategoryAlreadyExistsAndCreate from '../services/CheckCategoryAlreadyExistsAndCreate';
import CheckProductAlreadyExists from '../services/CheckProductAlreadyExists';
import CreateCodeSeral from '../services/CreateCodeSerial';

interface WhereProperties {
  name?: string | undefined;
  type?: string | undefined;
  cod?: string | undefined;
  category_id?: string | undefined;
}

export default class ProductsController {
  async create(request: Request, response: Response) : Promise<Response<any>> {
    const productsRepository = getRepository(ProductsModel);

    const {
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category,
    } = request.body;

    const checkCategoryAlreadyExistsAndCreate = new CheckCategoryAlreadyExistsAndCreate();
    const categoryId = await checkCategoryAlreadyExistsAndCreate.execute(category);

    const checkProductAlreadyExists = new CheckProductAlreadyExists();
    const isProductExists = await checkProductAlreadyExists.execute({
      name,
      quantity,
    });

    if (isProductExists) {
      return response.json(isProductExists);
    }

    const createCodeSeral = new CreateCodeSeral();

    const code = await createCodeSeral.execute({
      categoryId,
    });

    const product = productsRepository.create({
      cod: code,
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category_id: Number(categoryId),
      transaction_type: 'income',
    });

    await productsRepository.save(product);

    return response.status(201).json(product);
  }

  async index(request: Request, response: Response) : Promise<Response<any>> {
    const productsRepository = getRepository(ProductsModel);

    const products = await productsRepository.find();

    return response.json(products);
  }

  async filtered(request: Request, response: Response) : Promise<Response<any>> {
    const filters = request.query;

    const name = filters.name as string;
    const type = filters.type as string;
    const cod = filters.cod as string;
    const category = filters.category as string;

    const where = {} as WhereProperties;

    if (name) {
      where.name = name;
    }

    if (type) {
      where.type = type;
    }

    if (cod) {
      where.cod = cod;
    }

    if (category) {
      const categoryRepository = getRepository(CategoriesModel);
      const categoryObject = await categoryRepository.findOne({
        where: {
          title: category,
        },
      });

      const categoryId = categoryObject?.id;

      where.category_id = categoryId;
    }

    const productsRepository = getRepository(ProductsModel);
    const products = await productsRepository.find({
      where,
    });

    return response.json(products);
  }

  async store(request: Request, response: Response): Promise<Response<any>> {
    const { id } = request.params;

    const productsRepository = getRepository(ProductsModel);

    const product = await productsRepository.findOne({
      where: {
        id,
      },
    });

    return response.json(product);
  }

  async update(request: Request, response: Response) : Promise<Response<any>> {
    const {
      name,
      quantity,
      type,
      unity,
      price,
      description,
      category,
      transaction_type,
    } = request.body;

    const { id } = request.params;

    const productRepository = getRepository(ProductsModel);

    const product = await productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return response.status(404).json({
        message: 'Product not found',
      });
    }

    const checkCategoryAlreadyExistsAndCreate = new CheckCategoryAlreadyExistsAndCreate();
    const categoryId = await checkCategoryAlreadyExistsAndCreate.execute(category);

    const createCodeSeral = new CreateCodeSeral();
    const codeSerial = await createCodeSeral.execute({
      categoryId,
    });

    product.name = name;
    product.quantity = quantity;
    product.type = type;
    product.unity = unity;
    product.price = price;
    product.description = description;
    product.category_id = Number(categoryId);
    product.cod = codeSerial;
    product.transaction_type = transaction_type;

    await productRepository.save(product);

    return response.json(product);
  }

  async delete(request: Request, response: Response) : Promise<Response<any>> {
    const { id } = request.params;

    const productRepository = getRepository(ProductsModel);

    await productRepository.delete(id);

    return response.json({
      message: 'success',
    });
  }

  async report(request: Request, response: Response) : Promise<Response<any>> {
    const productsRepository = getRepository(ProductsModel);

    const products = await productsRepository.find({
      select: [
        'cod',
        'name',
        'quantity',
        'updated_at',
        'transaction_type',
      ],
      order: {
        category_id: 'ASC',
      },
    });

    return response.json(products);
  }
}
