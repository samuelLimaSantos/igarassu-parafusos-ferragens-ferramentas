import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import ProductsModel from '../models/Products';
import CategoriesModel from '../models/Categories';
import CheckCategoryAlreadyExistsAndCreate from '../services/CheckCategoryAlreadyExistsAndCreate';
import CheckProductAlreadyExistsByCategory from '../services/CheckProductAlreadyExistsByCategory';
import CreateProduct from '../services/CreateProduct';
import CreateCodeSeral from '../services/CreateCodeSerial';
import CreateTransactionHistory from '../services/CreateTransactionHistory';
import calculateTransactionTypeByQuantity from '../utils/CalculateTransactionTypeByQuantity';
import UpdateInventoryControlService from '../services/UpdateInventoryControlService';
import { productErrors } from '../errors/utils/ErrorsDescriptions';
import { AppError } from '../errors/AppError';

interface WhereProperties {
  name?: string | undefined;
  type?: string | undefined;
  cod?: string | undefined;
  category_id?: string | undefined;
}

export default class ProductsController {
  async create(request: Request, response: Response) : Promise<Response<ProductsModel>> {
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

    const schema = yup.object().shape({
      user_id: yup.string().uuid(productErrors.userMustBeUuid)
        .required(productErrors.userIdRequired),
      name: yup.string().required(productErrors.nameRequired),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne)
        .required(productErrors.quantityRequired),
      type: yup.string().required(productErrors.typeRequired),
      unity: yup.string().required(productErrors.unityRequired),
      price: yup.number().min(0.1, productErrors.priceLessThanZero)
        .required(productErrors.priceRequired),
      description: yup.string().required(productErrors.descriptionRequired),
      category: yup.string().required(productErrors.categoryRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const checkCategoryAlreadyExistsAndCreate = new CheckCategoryAlreadyExistsAndCreate();
    const categoryId = await checkCategoryAlreadyExistsAndCreate.execute(category);

    const checkProductAlreadyExistsByCategory = new CheckProductAlreadyExistsByCategory();

    await checkProductAlreadyExistsByCategory.execute({
      name,
      categoryId: Number(categoryId),
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
  }

  async index(request: Request, response: Response) : Promise<Response<any>> {
    const productsRepository = getRepository(ProductsModel);

    const products = await productsRepository.find();

    return response.json(products);
  }

  async filtered(request: Request, response: Response) : Promise<Response<any>> {
    const where = request.query;

    Object.keys(where).forEach((prop) => {
      if (!where[prop]) {
        delete where[prop];
      }
    });

    if (where.category) {
      const categoryRepository = getRepository(CategoriesModel);
      const categoryObject = await categoryRepository.findOne({
        where: {
          title: where.category,
        },
      });

      const categoryId = categoryObject?.id;

      where.category_id = categoryId;
      delete where.category;
    }

    const productsRepository = getRepository(ProductsModel);
    const products = await productsRepository.find({
      where,
    });

    return response.json(products);
  }

  async store(request: Request, response: Response): Promise<Response<any>> {
    const { id } = request.params;

    const schema = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.params, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors);
    }

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

    const schema = yup.object().shape({
      user_id: yup.string().uuid(productErrors.userMustBeUuid)
        .required(productErrors.userIdRequired),
      name: yup.string(),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne),
      type: yup.string(),
      unity: yup.string(),
      price: yup.number().min(0.1, productErrors.priceLessThanZero),
      description: yup.string(),
    });

    const schemaParams = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
      await schemaParams.validate(request.params, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const productRepository = getRepository(ProductsModel);

    const product = await productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado!', 404);
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
    product.type = type || product.type;
    product.unity = unity || product.unity;
    product.price = price || product.price;
    product.description = description || product.description;

    await productRepository.save(product);

    return response.status(200).json({ message: 'User updated with success' });
  }

  async delete(request: Request, response: Response) : Promise<Response<any>> {
    const { id } = request.params;

    const schema = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.params, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const productRepository = getRepository(ProductsModel);

    await productRepository.delete(id);

    return response.json({
      message: 'success',
    });
  }

  async updateInventoryControl(request: Request, response: Response): Promise<Response<any>> {
    const { user_id, quantity, transaction_type } = request.body;
    const { product_id } = request.params;

    const schema = yup.object().shape({
      user_id: yup.string().uuid(productErrors.userMustBeUuid)
        .required(productErrors.userIdRequired),
      transaction_type: yup.string().required(productErrors.transactionTypeRequired),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne)
        .required(productErrors.quantityRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const updateInventoryControlService = new UpdateInventoryControlService();

    await updateInventoryControlService.execute({
      user_id,
      product_id,
      quantity,
      transaction_type,
    });

    return response.status(200).json();
  }
}
