import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../errors/AppError';
import { categoriesErrors } from '../errors';

class EnsureFormatParams {
  async check(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const { title } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(categoriesErrors.titleRequired),
    });

    try {
      await schema.validate({ title }, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }
}

export default new EnsureFormatParams();
