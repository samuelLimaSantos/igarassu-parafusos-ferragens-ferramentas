import {
  Repository,
  EntityRepository,
} from 'typeorm';
import Products from '../models/Products';

interface PaginateProps {
  pageParse: number;
  take: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  where?: object,
}

interface FindPaginateResponse {
  products: Products[],
  totalProducts: number,
  totalPages: number,
  previousPage: number | null,
  nextPage: number | null,
  totalProductsActualPage: number,

}

@EntityRepository(Products)
class ProductsRepository extends Repository<Products> {
  async findAndPaginate({
    pageParse,
    take,
    where,
  }: PaginateProps): Promise<FindPaginateResponse> {
    const [products, count] = await this.findAndCount({
      skip: pageParse === 1 ? 0 : (pageParse - 1) * take,
      take,
      order: { created_at: 'DESC' },
      where: where || '',
    });

    const totalPages = Math.ceil(count / take);
    return {
      products,
      totalProducts: count,
      totalProductsActualPage: products.length,
      totalPages,
      previousPage: pageParse === 1 ? null : pageParse - 1,
      nextPage: pageParse === totalPages ? null : pageParse + 1,
    };
  }
}

export { ProductsRepository };
