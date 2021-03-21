import { Request, Response } from 'express';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { page, ...where } = request.query;

    const products = await this.listProductsUseCase.execute(Number(page), where);

    return response.json(products);
  }
}

export { ListProductsController };
