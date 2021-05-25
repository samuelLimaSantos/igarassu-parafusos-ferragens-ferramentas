import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, ...where } = request.query;

    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute(Number(page), where);

    return response.json(products);
  }
}

export { ListProductsController };
