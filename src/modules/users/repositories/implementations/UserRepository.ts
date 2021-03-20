import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../model/User';
import { ICreateUserDTO, IUserRepository } from '../interfaces/IUserRepository';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
  async getLoginByLoginName(login: string): Promise<User | undefined> {
    const user = await this.findOne({
      select: ['login'],
      where: {
        login,
      },
    });

    return user;
  }

  async getIdAndPasswordByLogin(login: string): Promise<User | undefined> {
    const user = await this.findOne({
      select: ['id', 'password'],
      where: {
        login,
      },
    });

    return user;
  }

  async createUser({ login, password }: ICreateUserDTO): Promise<void> {
    const user = this.create({
      login,
      password,
    });

    await this.save(user);
  }
}
export { UserRepository };
