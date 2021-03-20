import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateSessionController } from './CreateSessionController';
import { CreateSessionUseCase } from './CreateSessionUseCase';

const createSessionController = (): CreateSessionController => {
  const userRepository = getCustomRepository(UserRepository);
  const createSessionUseCase = new CreateSessionUseCase(userRepository);
  return new CreateSessionController(createSessionUseCase);
};

export { createSessionController };
