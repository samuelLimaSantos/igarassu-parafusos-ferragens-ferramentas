import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../../repositories/implementations/ProductRepository';
import { ListOneProductController } from './ListOneProductController';
import { ListOneProductUseCase } from './ListOneProductUseCase';

const listOneProductController = (): ListOneProductController => {
  const productRepository = getCustomRepository(ProductRepository);
  const listOneProductUseCase = new ListOneProductUseCase(productRepository);
  return new ListOneProductController(listOneProductUseCase);
};

export { listOneProductController };
