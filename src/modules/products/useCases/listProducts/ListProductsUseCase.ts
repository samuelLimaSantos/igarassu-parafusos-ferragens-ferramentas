import { takePages } from '../../../../utils/Constants';
import { IListProductsResponse, IProductRepository } from '../../repositories/interfaces/IProductRepository';

class ListProductsUseCase {
  constructor(private productRepository:IProductRepository) {}

  async execute(page: number): Promise<IListProductsResponse> {
    const { products, count } = await this.productRepository.findProductsPaginatedAndCount(page);

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
