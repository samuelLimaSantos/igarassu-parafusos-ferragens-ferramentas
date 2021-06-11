import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTransactionsUseCase } from './ListTransactionsUseCase';

class ListTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const { page, date } = request.query;

    let dateObj = null;

    if (date) {
      dateObj = JSON.parse(date as string);
    }

    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute({
      page: Number(page),
      product_id,
      date: dateObj,
    });

    return response.json(transactions);
  }
}

export { ListTransactionsController };
