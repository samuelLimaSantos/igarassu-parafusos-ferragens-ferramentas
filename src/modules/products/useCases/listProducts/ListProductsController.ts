import { Request, Response } from 'express';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const products = await this.listProductsUseCase.execute(Number(page));

    return response.json(products);
  }
}

export { ListProductsController };
