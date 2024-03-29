import { inject, injectable } from 'tsyringe';
import { takePages } from '../../../../shared/utils/Constants';
import { ICategoryRepository } from '../../../categories/repositories/interfaces/ICategoryRepository';
import { IListProductsResponse, IProductRepository } from '../../repositories/interfaces/IProductRepository';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository:IProductRepository,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(page: number, where: any): Promise<IListProductsResponse> {
    Object.keys(where).forEach((prop) => {
      if (!where[prop]) {
        delete where[prop];
      }
    });

    if (where.category) {
      const categoryObject = await this.categoryRepository.findByTitle(where.category);

      const categoryId = categoryObject?.id;

      where.category_id = categoryId;
      delete where.category;
    }

    const {
      products,
      count,
    } = await this.productRepository.findProductsPaginatedAndCount(page, where);

    const totalPages = Math.ceil(count / takePages);

    return {
      products,
      totalProducts: count,
      totalProductsActualPage: products.length,
      totalPages: totalPages === 0 ? 1 : totalPages,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
      actualPage: page,
    };
  }
}

export { ListProductsUseCase };
