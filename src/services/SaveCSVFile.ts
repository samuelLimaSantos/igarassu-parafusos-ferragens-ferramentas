import csvParse from 'csv-parse';
import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import ProductModel from '../models/Products';
import CheckCategoryAlreadyExistsAndCreate from './CheckCategoryAlreadyExistsAndCreate';
import CheckProductAlreadyExists from './CheckProductAlreadyExists';
import CreateCodeSeral from './CreateCodeSerial';
import CreateProduct from './CreateProduct';

interface CSVProducts {
  name: string;
  quantity: number;
  type: string;
  unity: string;
  price: number;
  description: string;
  category: string;
}

export default class SaveCSVFile {
  public async execute(): Promise<void> {
    const csvFilePath = path.resolve(
      __dirname,
      '..',
      'tmp',
      'import',
    );

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const products: CSVProducts[] = [];
    const categories: string[] = [];

    parseCSV.on('data', (product) => {
      const [name,
        quantity,
        type,
        unity,
        price,
        description,
        category,
      ] = product.map((cell: string) => cell.trim());

      if (!name
         || !quantity
          || !type
           || !unity
            || !price
             || !description
              || !category) return;

      const quantityNumber = Number(quantity);
      const priceNumber = Number(price);

      categories.push(category);
      products.push({
        name,
        quantity: quantityNumber,
        type,
        unity,
        price: priceNumber,
        description,
        category,
      });
    });

    await new Promise((resolve) => {
      parseCSV.on('end', resolve);
    });

    const productsRepository = getRepository(ProductModel);

    products.forEach(async (product) => {
      const checkCategoryAlreadyExistsAndCreate = new CheckCategoryAlreadyExistsAndCreate();
      const categoryId = await checkCategoryAlreadyExistsAndCreate.execute(product.category);

      const checkProductAlreadyExists = new CheckProductAlreadyExists();

      await checkProductAlreadyExists.execute({
        name: product.name,
        quantity: product.quantity,
      });

      const createCodeSeral = new CreateCodeSeral();

      const code = await createCodeSeral.execute({
        categoryId,
      });

      console.log(code);

      const createProduct = new CreateProduct();

      const newProduct = await createProduct.execute({
        cod: code,
        category_id: Number(categoryId),
        description: product.description,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        type: product.type,
        unity: product.unity,
      });

      await productsRepository.save(newProduct);
    });
  }
}
