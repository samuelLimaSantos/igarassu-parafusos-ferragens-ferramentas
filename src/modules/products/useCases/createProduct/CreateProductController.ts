import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
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
      ncm_sh,
    } = request.body;

    const { id } = request.user;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    await createProductUseCase.execute({
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
      ncm_sh,
    });

    return response.status(201).send();
  }
}

export { CreateProductController };
