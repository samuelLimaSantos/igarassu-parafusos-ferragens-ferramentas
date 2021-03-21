import { EntityRepository, Repository } from 'typeorm';
import { takePages } from '../../../../shared/utils/Constants';
import { Product } from '../../model/Product';
import { ICreateProductDTO, IFindProductsPaginateAndCountResponse, IProductRepository } from '../interfaces/IProductRepository';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> implements IProductRepository {
  async saveMultipleProducts(products: Product[]): Promise<void> {
    await this.save(products);
  }

  createProduct({
    cod,
    name,
    quantity,
    type,
    unity,
    description,
    category_id,
    price_buy,
    price_sell,
    image_id,
  }: ICreateProductDTO): Product {
    const product = this.create({
      cod,
      name,
      quantity,
      type,
      unity,
      description,
      category_id,
      image_id,
      price_sell,
      price_buy,
    });

    return product;
  }

  async saveProduct(product: Product): Promise<void> {
    await this.save(product);
  }

  async getProductByCategoryAndName(
    name: string,
    category_id: number,
  ): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
        category_id,
      },
    });

    return product;
  }

  async getLastProductByCategory(category_id: number): Promise<Product | undefined> {
    const lastItemRegistered = await this.findOne({
      where: {
        category_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return lastItemRegistered;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  async getProductInventoryById(product_id: string): Promise<number | undefined> {
    const productInventory = await this.findOne({
      select: ['id', 'quantity'],
      where: {
        id: product_id,
      },
    });

    return productInventory?.quantity;
  }

  async findProductsPaginatedAndCount(page: number, where: object):
    Promise<IFindProductsPaginateAndCountResponse> {
    const [products, count] = await this.findAndCount({
      skip: page === 1 ? 0 : (page - 1) * takePages,
      take: takePages,
      order: { created_at: 'DESC' },
      where: where || '',
    });

    return {
      products, count,
    };
  }

  async deleteProductById(id: string): Promise<void> {
    await this.delete(id);
  }
}

export { ProductRepository };
