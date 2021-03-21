import { Repository, EntityRepository } from 'typeorm';
import { Category } from '../../model/Category';
import { ICategoryRepository } from '../interfaces/ICategoryRepository';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> implements ICategoryRepository {
  async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.findOne({ title });

    return category;
  }

  async createCategory(title: string): Promise<number> {
    const category = this.create({
      title,
    });

    await this.save(category);

    return category.id;
  }

  async listCategories(): Promise<Category[] | undefined> {
    const categories = await this.find();

    return categories;
  }
}

export { CategoryRepository };
