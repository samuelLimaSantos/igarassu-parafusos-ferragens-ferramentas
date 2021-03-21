import { Category } from '../../model/Category';

interface ICategoryRepository {
  findByTitle(title: string): Promise<Category | undefined> ;
  createCategory(title: string): Category;
  saveCategory(category: Category): Promise<void>
  saveMultiplesCategories(categories: Category[]): Promise<void>
  listCategories(): Promise<Category[] | undefined> ;
}

export { ICategoryRepository };
