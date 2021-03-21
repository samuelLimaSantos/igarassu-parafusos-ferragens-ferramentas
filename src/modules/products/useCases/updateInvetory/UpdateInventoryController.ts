import { Request, Response } from 'express';
import { UpdateInventoryUseCase } from './UpdateInventoryUseCase';

class UpdateInventoryController {
  constructor(private updateInventoryUseCase: UpdateInventoryUseCase) {}

  async handle(request: Request, response: Response) : Promise<Response> {
    const { quantity, transaction_type } = request.body;
    const { product_id } = request.params;

    const user_id = request.user.id;

    await this.updateInventoryUseCase.execute({
      user_id,
      quantity,
      product_id,
      transaction_type,
    });

    return response.status(204).send();
  }
}

export { UpdateInventoryController };
