import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { sessionErrors, usersErrors } from '../errors';

class EnsureFormatParams {
  async createUser(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      login: yup.string().required(usersErrors.loginRequired),
      password: yup.string().min(6, usersErrors.passwordMinLength)
        .required(usersErrors.passwordRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }

  async createSession(request: Request, _response: Response,
    next: NextFunction): Promise<void> {
    const schema = yup.object().shape({
      login: yup.string().required(sessionErrors.loginRequired),
      password: yup.string().min(6, sessionErrors.passwordMinLength)
        .required(sessionErrors.passwordRequired),
    });

    try {
      await schema.validate(request.body);
    } catch (error) {
      throw new AppError(error.errors);
    }

    next();
  }
}

export default new EnsureFormatParams();
