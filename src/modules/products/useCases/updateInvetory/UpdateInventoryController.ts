import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateInventoryUseCase } from './UpdateInventoryUseCase';

class UpdateInventoryController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { quantity, transaction_type } = request.body;
    const { product_id } = request.params;

    const user_id = request.user.id;

    const updateInventoryUseCase = container.resolve(UpdateInventoryUseCase);

    await updateInventoryUseCase.execute({
      user_id,
      quantity,
      product_id,
      transaction_type,
    });

    return response.status(204).send();
  }
}

export { UpdateInventoryController };
