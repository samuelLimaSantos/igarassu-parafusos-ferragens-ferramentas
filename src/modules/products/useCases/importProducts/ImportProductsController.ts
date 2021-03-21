import { Request, Response } from 'express';
import { ImportProductsUseCase } from './ImportProductsUseCase';

class ImportProductsController {
  constructor(private importProductsUseCase: ImportProductsUseCase) {}

  async handle(request: Request, response: Response) : Promise<Response> {
    const { file } = request;
    const { id } = request.user;

    await this.importProductsUseCase.execute(id, file);

    return response.status(201).send();
  }
}

export { ImportProductsController };
