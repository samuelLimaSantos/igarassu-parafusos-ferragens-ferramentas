import { Response, Request } from 'express';

export default class ProductsController {
  create(request: Request, response: Response) {
    const {
      cod,
      category,
      name,
      quantity,
      type,
      unity,
      price,
      description,
    } = request.body;

    response.json({
      cod,
      category,
      name,
      quantity,
      type,
      unity,
      price,
      description,
    });
  }
}
