import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      image_id,
      name,
      quantity,
      type,
      unity,
      price_sell,
      price_buy,
      description,
      category,

    } = request.body;

    const { id } = request.user;

    await this.createProductUseCase.execute({
      category,
      description,
      user_id: id,
      image_id,
      name,
      price_buy,
      price_sell,
      quantity,
      type,
      unity,
    });

    return response.status(201).send();
  }
}

export { CreateProductController };
