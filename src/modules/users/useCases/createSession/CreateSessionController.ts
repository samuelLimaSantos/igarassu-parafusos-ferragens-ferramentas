import { Request, Response } from 'express';
import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  constructor(private createSessionUseCase: CreateSessionUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const credentials = await this.createSessionUseCase.execute({ login, password });

    return response.json(credentials);
  }
}

export { CreateSessionController };
