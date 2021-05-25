import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTransactionsUseCase } from './ListTransactionsUseCase';

class ListTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const { page } = request.query;

    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute({
      page: Number(page),
      product_id,
    });

    return response.json(transactions);
  }
}

export { ListTransactionsController };
