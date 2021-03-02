import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/Users';
import authConfig from '../config/authConfig';
import { AppError } from '../errors/AppError';
import { sessionErrors } from '../errors/utils/ErrorsDescriptions';

interface Request {
  login: string;
  password: string;
}

interface Response {
  id: string,
  token: string;
}

export default class ValidadeSession {
  public async execute({ login, password }: Request): Promise<Response> {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne({
      select: ['id', 'password'],
      where: {
        login,
      },
    });

    if (!user) {
      throw new AppError(sessionErrors.combinationsDoesNotMatch);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(sessionErrors.combinationsDoesNotMatch);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const { id } = user;

    return {
      id,
      token,
    };
  }
}
