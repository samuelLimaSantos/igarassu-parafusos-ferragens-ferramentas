import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { productErrors } from '../errors';

class EnsureFormatParams {
  async listProducts(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      page: yup.string().required(productErrors.pageRequired),
    });

    try {
      await schema.validate(request.query);
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async listOneProduct(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async deleteProduct(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async updateInventory(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      transaction_type: yup.string().required(productErrors.transactionTypeRequired),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne)
        .required(productErrors.quantityRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async updateProduct(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      name: yup.string(),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne),
      type: yup.string(),
      unity: yup.string(),
      description: yup.string(),
      price_sell: yup.number().min(0, productErrors.priceLessThanZero),
      price_buy: yup.number().min(0, productErrors.priceLessThanZero),
      image_id: yup.number().min(0),
    });

    const schemaParams = yup.object().shape({
      id: yup.string().uuid(productErrors.userMustBeUuid).required(productErrors.userIdRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
      await schemaParams.validate(request.params, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async createProduct(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      name: yup.string().required(productErrors.nameRequired),
      quantity: yup.number().min(1, productErrors.quantityLessThanOne)
        .required(productErrors.quantityRequired),
      type: yup.string().required(productErrors.typeRequired),
      unity: yup.string().required(productErrors.unityRequired),
      price_sell: yup.number().min(0.1, productErrors.priceLessThanZero)
        .required(productErrors.priceSellRequired),
      price_buy: yup.number().min(0.1, productErrors.priceLessThanZero)
        .required(productErrors.priceBuyRequired),
      description: yup.string().required(productErrors.descriptionRequired),
      category: yup.string().required(productErrors.categoryRequired),
      image_id: yup.number().min(0).required(productErrors.imageIdRequired),
      ncm_sh: yup.string().required(productErrors.ncmShRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }
}

export default new EnsureFormatParams();
