import { Request, Response } from 'express';
import * as yup from 'yup';
import { AppError } from '../../../../errors/AppError';
import { categoriesErrors } from '../../../../errors/utils/ErrorsDescriptions';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(categoriesErrors.titleRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    await this.createCategoryUseCase.execute(title);

    return response.status(201).send();
  }
}

export { CreateCategoryController };
