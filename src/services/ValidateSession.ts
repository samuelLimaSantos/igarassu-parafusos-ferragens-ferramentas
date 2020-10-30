import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/Users';
import authConfig from '../config/authConfig';

interface Request {
  login: string;
  password: string;
}

interface Response {
  user: UserModel,
  token: string;
}

export default class ValidadeSession {
  public async execute({ login, password }: Request): Promise<Response> {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne({
      where: {
        login,
      },
    });

    if (!user) {
      throw new Error('Combination login/password does not match');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Combination login/password does not match');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
