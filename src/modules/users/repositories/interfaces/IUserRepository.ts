import { User } from '../../infra/typeorm/entities/User';

interface ICreateUserDTO {
  login: string;
  password: string;
}

interface IUserRepository {
  getLoginByLoginName(login: string): Promise<User | undefined>;
  createUser({ login, password }: ICreateUserDTO): Promise<void>;
  getIdAndPasswordByLogin(login: string): Promise<User | undefined>;
}

export { IUserRepository, ICreateUserDTO };
