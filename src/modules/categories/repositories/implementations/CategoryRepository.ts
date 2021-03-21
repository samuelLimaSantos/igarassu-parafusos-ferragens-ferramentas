import { Repository, EntityRepository } from 'typeorm';
import { Category } from '../../model/Category';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> implements ICategoryRepository {
  async saveMultiplesCategories(categories: Category[]): Promise<void> {
    this.create(categories);
    await this.save(categories);
  }

  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.findOne({
      where: {
        title,
      },
    });

    return category;
  }

  createCategory(title: string): Category {
    const category = this.create({
      title,
    });

    return category;
  }

  async saveCategory(category: Category): Promise<void> {
    await this.save(category);
  }

  async listCategories(): Promise<Category[] | undefined> {
    const categories = await this.find();

    return categories;
  }
}

export { CategoryRepository };
