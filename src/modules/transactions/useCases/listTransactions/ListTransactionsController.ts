import { Request, Response } from 'express';
import { ListTransactionsUseCase } from './ListTransactionsUseCase';

class ListTransactionsController {
  constructor(private listTransactionsUseCase: ListTransactionsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const { page } = request.query;

    const transactions = await this.listTransactionsUseCase.execute({
      page: Number(page),
      product_id,
    });

    return response.json(transactions);
  }
}

export { ListTransactionsController };
