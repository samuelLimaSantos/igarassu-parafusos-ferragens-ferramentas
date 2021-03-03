/* eslint-disable @typescript-eslint/ban-types */
import {
  Repository,
  EntityRepository,
} from 'typeorm';
import Products from '../models/Products';
import { takePages } from '../utils/Contants';

interface PaginateProps {
  page: number;
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
    page,
    where,
  }: PaginateProps): Promise<FindPaginateResponse> {
    const [products, count] = await this.findAndCount({
      skip: page === 1 ? 0 : (page - 1) * takePages,
      take: takePages,
      order: { created_at: 'DESC' },
      where: where || '',
    });

    const totalPages = Math.ceil(count / takePages);
    return {
      products,
      totalProducts: count,
      totalProductsActualPage: products.length,
      totalPages,
      previousPage: page === 1 ? null : page - 1,
      nextPage: page === totalPages ? null : page + 1,
    };
  }
}

export { ProductsRepository };
