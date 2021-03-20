import { Category } from '../../model/Category';

interface ICategoryRepository {
  findByTitle(title: string): Promise<Category | undefined> ;
  createCategory(title: string): Promise<void>;
  listCategories(): Promise<Category[] | undefined> ;
}

export { ICategoryRepository };
