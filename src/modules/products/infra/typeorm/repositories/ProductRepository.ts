import { getRepository, Repository } from 'typeorm';
import { takePages } from '../../../../../shared/utils/Constants';
import { Product } from '../entities/Product';
import { ICreateProductDTO, IProductRepository } from '../../../repositories/interfaces/IProductRepository';

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

  async deleteProductById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findProductsPaginatedAndCount(page: number, where: any) {
    const query = this.repository.createQueryBuilder('products');

    if (where) {
      const {
        name, unity, cod, category_id,
      } = where;

      if (name) query.where('name ILIKE :searchTerm', { searchTerm: `%${name}%` });

      if (unity) query.andWhere('unity = :unity', { unity });

      if (cod) query.andWhere('cod = :cod', { cod });

      if (category_id) query.andWhere('category_id = :category_id', { category_id });
    }

    const [products, count] = await query.select([
      'categories.id',
      'categories.title',
      'categories.created_at',
      'categories.updated_at',
      'products.id',
      'products.name',
      'products.cod',
      'products.quantity',
      'products.unity',
      'products.type',
      'products.price_sell',
      'products.price_buy',
      'products.image_id',
      'products.description',
      'products.created_at',
      'products.updated_at',
    ])
      .leftJoin('products.category_id', 'categories')
      .skip(page === 1 ? 0 : (page - 1) * takePages)
      .take(takePages)
      .orderBy('products.created_at', 'DESC')
      .getManyAndCount();

    return {
      products, count,
    };
  }
}

export { ProductRepository };
