import { EntityRepository, getRepository, Repository } from 'typeorm';
import { takePages } from '../../../../../shared/utils/Constants';
import { Product } from '../entities/Product';
import { ICreateProductDTO, IFindProductsPaginateAndCountResponse, IProductRepository } from '../../../repositories/interfaces/IProductRepository';

class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async saveMultipleProducts(products: Product[]): Promise<void> {
    await this.repository.save(products);
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
    const product = this.repository.create({
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
    await this.repository.save(product);
  }

  async getProductByCategoryAndName(
    name: string,
    category_id: number,
  ): Promise<Product | undefined> {
    const product = await this.repository.findOne({
      where: {
        name,
        category_id,
      },
    });

    return product;
  }

  async getLastProductByCategory(category_id: number): Promise<Product | undefined> {
    const lastItemRegistered = await this.repository.findOne({
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
    const product = await this.repository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  async getProductInventoryById(product_id: string): Promise<number | undefined> {
    const productInventory = await this.repository.findOne({
      select: ['id', 'quantity'],
      where: {
        id: product_id,
      },
    });

    return productInventory?.quantity;
  }

  async findProductsPaginatedAndCount(page: number, where: object):
    Promise<IFindProductsPaginateAndCountResponse> {
    const [products, count] = await this.repository.findAndCount({
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
    await this.repository.delete(id);
  }
}

export { ProductRepository };
