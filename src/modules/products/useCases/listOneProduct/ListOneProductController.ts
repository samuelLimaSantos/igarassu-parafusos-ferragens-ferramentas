import { Request, Response } from 'express';
import { ListOneProductUseCase } from './ListOneProductUseCase';

class ListOneProductController {
  constructor(private listOneProductUseCase: ListOneProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const product = await this.listOneProductUseCase.execute(id);

    return response.json(product);
  }
}

export { ListOneProductController };
