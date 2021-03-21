import { Category } from '../../model/Category';

interface ICategoryRepository {
  findByTitle(title: string): Promise<Category | undefined> ;
  createCategory(title: string): Promise<number>;
  listCategories(): Promise<Category[] | undefined> ;
}

export { ICategoryRepository };
