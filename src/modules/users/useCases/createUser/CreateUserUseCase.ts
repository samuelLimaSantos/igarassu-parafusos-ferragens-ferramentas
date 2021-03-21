import { hash } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';
import { usersErrors } from '../../errors';
import { ICreateUserDTO, IUserRepository } from '../../repositories/interfaces/IUserRepository';

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }

  async execute({ login, password }: ICreateUserDTO): Promise<void> {
    const userLogin = await this.userRepository.getLoginByLoginName(login);

    if (userLogin) throw new AppError(usersErrors.userAlreadyRegistered);

    const hashedPassword = await this.hashPassword(password);

    this.userRepository.createUser({
      login,
      password: hashedPassword,
    });
  }
}

export { CreateUserUseCase };
