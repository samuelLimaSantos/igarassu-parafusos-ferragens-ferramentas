import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { productErrors } from '../../products/errors';

class EnsureFormatParams {
  async listTransaction(request: Request, _response: Response,
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
