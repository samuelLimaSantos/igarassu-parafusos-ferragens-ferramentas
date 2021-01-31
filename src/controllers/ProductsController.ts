import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import ProductsModel from '../models/Products';
import CategoriesModel from '../models/Categories';
import CheckCategoryAlreadyExistsAndCreate from '../services/CheckCategoryAlreadyExistsAndCreate';
import CheckProductAlreadyExists from '../services/CheckProductAlreadyExists';
import CreateProduct from '../services/CreateProduct';
import CreateCodeSeral from '../services/CreateCodeSerial';
import CreateTransactionHistory from '../services/CreateTransactionHistory';
import calculateTransactionTypeByQuantity from '../utils/CalculateTransactionTypeByQuantity';
import UpdateInventoryControlService from '../services/UpdateInventoryControlService';

interface WhereProperties {
  name?: string | undefined;
  type?: string | undefined;
  cod?: string | undefined;
  category_id?: string | undefined;
}

export default class ProductsController {
  async create(request: Request, response: Response) : Promise<Response<ProductsModel>> {
    try {
      const productsRepository = getRepository(ProductsModel);

      const {
        name,
        quantity,
        type,
        unity,
        price,
        description,
        category,
        user_id,
      } = request.body;

      const checkCategoryAlreadyExistsAndCreate = new CheckCategoryAlreadyExistsAndCreate();
      const categoryId = await checkCategoryAlreadyExistsAndCreate.execute(category);

      const checkProductAlreadyExists = new CheckProductAlreadyExists();

      await checkProductAlreadyExists.execute({
        name,
      });

      const createCodeSeral = new CreateCodeSeral();

      const code = await createCodeSeral.execute({
        categoryId,
      });

      const createProduct = new CreateProduct();

      const product = await createProduct.execute({
        cod: code,
        category_id: Number(categoryId),
        description,
        name,
        price,
        quantity,
        type,
        unity,
      });

      await productsRepository.save(product);

      const createTransactionHistory = new CreateTransactionHistory();

      await createTransactionHistory.execute({
        user_id,
        product_id: product.id,
        quantity,
        transaction_type: 'income',
      });

      return response.status(201).json(product);
    } catch (err) {
      return response.status(400).json(err.message);
    }
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
      user_id,
      name,
      quantity,
      type,
      unity,
      price,
      description,
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

    const transaction_type = calculateTransactionTypeByQuantity({
      actualQuantity: product.quantity,
      newQuantity: quantity,
    });

    if (quantity && quantity !== product.quantity) {
      const createTransactionHistory = new CreateTransactionHistory();

      await createTransactionHistory.execute({
        product_id: product.id,
        user_id,
        quantity: Math.abs(quantity - product.quantity),
        transaction_type,
      });
    }

    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.type = type || quantity.type;
    product.unity = unity || quantity.unity;
    product.price = price || quantity.price;
    product.description = description || quantity.description;

    await productRepository.save(product);

    return response.status(200).json({ message: 'User updated with success' });
  }

  async delete(request: Request, response: Response) : Promise<Response<any>> {
    const { id } = request.params;

    const productRepository = getRepository(ProductsModel);

    await productRepository.delete(id);

    return response.json({
      message: 'success',
    });
  }

  async updateInventoryControl(request: Request, response: Response): Promise<Response<any>> {
    try {
      const { user_id, quantity, transaction_type } = request.body;
      const { product_id } = request.params;

      const updateInventoryControlService = new UpdateInventoryControlService();

      await updateInventoryControlService.execute({
        user_id,
        product_id,
        quantity,
        transaction_type,
      });

      return response.status(200).json({ message: 'Inventory updated with success' });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
