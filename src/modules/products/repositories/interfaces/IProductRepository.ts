import { Product } from '../../model/Product';

interface IFindProductsPaginateAndCountResponse {
  products: Product[];
  count: number;
}

interface IListProductsResponse {
  products: Product[],
  totalProducts: number,
  totalPages: number,
  previousPage: number | null,
  nextPage: number | null,
  totalProductsActualPage: number,
  actualPage: number;
}

interface IProductRepository {
  findProductsPaginatedAndCount(page: number, where?: object)
    : Promise<IFindProductsPaginateAndCountResponse>

  getProductInventoryById(product_id: string): Promise<number | undefined>
}

export { IFindProductsPaginateAndCountResponse, IProductRepository, IListProductsResponse };
