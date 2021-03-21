import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/authConfig';
import { AppError } from '../../../../shared/errors/AppError';
import { sessionErrors } from '../../errors';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface ICreateSessionDto {
  login: string;
  password: string;
}

class CreateSessionUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ login, password }: ICreateSessionDto): Promise<{id: string, token: string}> {
    const user = await this.userRepository.getIdAndPasswordByLogin(login);

    if (!user) {
      throw new AppError(sessionErrors.combinationsDoesNotMatch);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(sessionErrors.combinationsDoesNotMatch);
    }

    const { id } = user;

    const token = this.generateJwtToken(id);

    return {
      id,
      token,
    };
  }

  private generateJwtToken(id: string): string {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret || '', {
      subject: id,
      expiresIn,
    });

    return token;
  }
}

export { CreateSessionUseCase };
