import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    await this.createCategoryUseCase.execute(title);

    return response.status(201).send();
  }
}

export { CreateCategoryController };
