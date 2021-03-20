import { User } from '../../model/User';

interface ICreateUserDTO {
  login: string;
  password: string;
}

interface IUserRepository {
  getLoginByLoginName(login: string): Promise<User | undefined>;
  createUser({ login, password }: ICreateUserDTO): Promise<void>;
}

export { IUserRepository, ICreateUserDTO };
