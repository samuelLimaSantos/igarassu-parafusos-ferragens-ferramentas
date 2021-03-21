import { EntityRepository, Repository } from 'typeorm';
import { takePages } from '../../../../utils/Constants';
import { Product } from '../../model/Product';
import { IFindProductsPaginateAndCountResponse, IProductRepository } from '../interfaces/IProductRepository';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> implements IProductRepository {
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
}

export { ProductRepository };
