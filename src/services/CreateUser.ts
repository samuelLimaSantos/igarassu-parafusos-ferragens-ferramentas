import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserModel from '../models/Users';

interface Request {
  login: string;
  password: string;
}

export default class CreateUser {
  public async execute({ login, password }: Request): Promise<UserModel> {
    const userRepository = getRepository(UserModel);

    const checkLogin = await userRepository.findOne({
      where: {
        login,
      },
    });

    if (checkLogin) {
      throw new Error('Login is already registered');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      login,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
