import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/implementations/UserRepository';

import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const createUserController = (): CreateUserController => {
  const userRepository = getCustomRepository(UserRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return new CreateUserController(createUserUseCase);
};

export { createUserController };
