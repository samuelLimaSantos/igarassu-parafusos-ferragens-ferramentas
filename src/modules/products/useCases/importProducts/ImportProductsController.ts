import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportProductsUseCase } from './ImportProductsUseCase';

class ImportProductsController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { file } = request;
    const { id } = request.user;

    const importProductsUseCase = container.resolve(ImportProductsUseCase);

    await importProductsUseCase.execute(id, file);

    return response.status(201).send();
  }
}

export { ImportProductsController };
