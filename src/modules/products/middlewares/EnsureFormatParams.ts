import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../errors/AppError';
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
}

export default new EnsureFormatParams();
