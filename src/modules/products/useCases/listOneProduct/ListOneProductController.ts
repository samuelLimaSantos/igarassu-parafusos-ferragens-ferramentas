import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListOneProductUseCase } from './ListOneProductUseCase';

class ListOneProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listOneProductUseCase = container.resolve(ListOneProductUseCase);

    const product = await listOneProductUseCase.execute(id);

    return response.json(product);
  }
}

export { ListOneProductController };
