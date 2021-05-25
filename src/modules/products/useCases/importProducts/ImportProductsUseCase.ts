/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { parse } from 'node-xlsx';
import { inject, injectable } from 'tsyringe';
import { Category } from '../../../categories/infra/typeorm/entities/Category';
import { ICategoryRepository } from '../../../categories/repositories/interfaces/ICategoryRepository';
import { Transaction } from '../../../transactions/infra/typeorm/entities/Transaction';
import { ITransactionRepository } from '../../../transactions/repositories/interfaces/ITransactionRepository';
import { Product } from '../../infra/typeorm/entities/Product';
import { IProductRepository } from '../../repositories/interfaces/IProductRepository';

@injectable()
class ImportProductsUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  private hasError = false;

  private category_id: number ;

  private products: Product[] = [];

  private categories: Category[] = []

  private transactions: Transaction[] = []

  async execute(user_id: string, file: Express.Multer.File) {
    const stream = fs.readFileSync(file.path);

    const [parsedXlsx] = parse(stream);

    parsedXlsx.data.splice(0, 1);

    for (const line of parsedXlsx.data) {
      if (line.includes(undefined)) {
        this.hasError = true;
        continue;
      }

      if (line.length < 8) {
        this.hasError = true;
        continue;
      }

      try {
        const lineObject = {
          name: String(line[0]),
          quantity: Number(line[1]),
          type: String(line[2]),
          unity: String(line[3]),
          price_sell: Number(line[4]),
          price_buy: Number(line[5]),
          description: String(line[6]),
          category: String(line[7]),
          image_id: Math.floor(Math.random() * 7) + 1,
        };

        if (Object.values(lineObject).includes(NaN)) {
          this.hasError = true;
          continue;
        }

        const categoryAlreadyExists = await this.categoryRepository.findByTitle(
          lineObject.category,
        );

        if (!categoryAlreadyExists) {
          const categoryModel = this.categoryRepository.createCategory(lineObject.category);
          await this.categoryRepository.saveCategory(categoryModel);
          this.category_id = categoryModel.id;
        }

        this.category_id = categoryAlreadyExists ? categoryAlreadyExists.id : this.category_id;

        const productAlreadyExistsInCategory = await this.productRepository
          .getProductByCategoryAndName(
            lineObject.name,
            this.category_id,
          );

        if (productAlreadyExistsInCategory) {
          this.hasError = true;
          continue;
        }

        const cod = await this.createCodeSerial(this.category_id);

        const product = {
          category_id: this.category_id,
          cod,
          description: lineObject.description,
          name: lineObject.name,
          price_sell: lineObject.price_sell,
          price_buy: lineObject.price_buy,
          image_id: lineObject.image_id,
          quantity: lineObject.quantity,
          type: lineObject.type,
          unity: lineObject.unity,
        };

        const productModel = this.productRepository.createProduct(product);
        await this.productRepository.saveProduct(productModel);

        this.products.push(productModel);

        const transaction = this.transactionRepository.createTransaction({
          product_id: productModel.id,
          quantity: lineObject.quantity,
          transaction_type: 'income',
          user_id,
        });

        this.transactions.push(transaction);
      } catch (error) {
        console.log(error);
        continue;
      }
    }

    // await this.categoryRepository.saveMultiplesCategories(this.categories);

    // await this.productRepository.saveMultipleProducts(this.products);
    await this.transactionRepository.saveMultipleTransactions(this.transactions);
    await fs.promises.unlink(file.path);
  }

  private async createCodeSerial(category_id: number): Promise<string> {
    const lastItemRegistered = await this.productRepository.getLastProductByCategory(category_id);

    if (!lastItemRegistered) {
      return `${category_id}-1`;
    }

    const [, lastNumber] = lastItemRegistered.cod.split('-');

    return `${category_id}-${Number(lastNumber) + 1}`;
  }
}

export { ImportProductsUseCase };
