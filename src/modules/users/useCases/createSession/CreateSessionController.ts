import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const credentials = await createSessionUseCase.execute({ login, password });

    return response.json(credentials);
  }
}

export { CreateSessionController };
