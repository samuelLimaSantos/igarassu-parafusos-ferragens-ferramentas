import { Repository, getRepository } from 'typeorm';
import { Category } from '../entities/Category';
import { ICategoryRepository } from '../../../repositories/interfaces/ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async saveMultiplesCategories(categories: Category[]): Promise<void> {
    this.repository.create(categories);
    await this.repository.save(categories);
  }

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      where: {
        title,
      },
    });

    return category;
  }

  createCategory(title: string): Category {
    const category = this.repository.create({
      title,
    });

    return category;
  }

  async saveCategory(category: Category): Promise<void> {
    await this.repository.save(category);
  }

  async listCategories(): Promise<Category[] | undefined> {
    const categories = await this.repository.find();

    return categories;
  }
}

export { CategoryRepository };
