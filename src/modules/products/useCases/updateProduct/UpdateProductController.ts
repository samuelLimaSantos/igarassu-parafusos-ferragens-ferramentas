import { Request, Response } from 'express';
import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      quantity,
      type,
      unity,
      price_sell,
      price_buy,
      image_id,
      description,
    } = request.body;

    const { id } = request.params;

    const user_id = request.user.id;

    await this.updateProductUseCase.execute({
      name,
      quantity,
      type,
      unity,
      price_sell,
      price_buy,
      image_id,
      description,
      id,
      user_id,
    });

    return response.status(204).send();
  }
}

export { UpdateProductController };
