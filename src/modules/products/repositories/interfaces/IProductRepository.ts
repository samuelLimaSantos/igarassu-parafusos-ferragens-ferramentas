import { Product } from '../../infra/typeorm/entities/Product';

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

interface ICreateProductDTO {
  cod: string;
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price_sell: number;
  price_buy: number;
  image_id: number;
  description: string;
  category_id: number;
}

interface IProductRepository {
  findProductsPaginatedAndCount(page: number, where?: object)
    : Promise<IFindProductsPaginateAndCountResponse>
  getProductInventoryById(product_id: string): Promise<number | undefined>
  getProductById(id: string): Promise<Product | undefined>
  deleteProductById(id: string): Promise<void>
  saveProduct(product: Product): Promise<void>
  getProductByCategoryAndName(name: string, category_id: number): Promise<Product | undefined>
  getLastProductByCategory(category_id: number): Promise<Product | undefined>
  createProduct({
    cod,
    name,
    category_id,
    description,
    price_buy,
    price_sell,
    image_id,
    quantity,
    type,
    unity,
  }: ICreateProductDTO): Product

  saveMultipleProducts(products: Product[]): Promise<void>
}

export {
  IFindProductsPaginateAndCountResponse,
  IProductRepository,
  IListProductsResponse,
  ICreateProductDTO,
};
