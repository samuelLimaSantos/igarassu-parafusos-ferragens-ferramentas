import { EntityRepository, Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { ICreateUserDTO, IUserRepository } from '../../../repositories/interfaces/IUserRepository';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async getLoginByLoginName(login: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      select: ['login'],
      where: {
        login,
      },
    });

    return user;
  }

  async getIdAndPasswordByLogin(login: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      select: ['id', 'password'],
      where: {
        login,
      },
    });

    return user;
  }

  async createUser({ login, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      login,
      password,
    });

    await this.repository.save(user);
  }
}
export { UserRepository };
