import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
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
      ncm_sh,
    } = request.body;

    const { id } = request.params;

    const user_id = request.user.id;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    await updateProductUseCase.execute({
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
      ncm_sh,
    });

    return response.status(204).send();
  }
}

export { UpdateProductController };
