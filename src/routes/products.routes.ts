import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const routes = Router();

const productsController = new ProductsController();

routes.post('/', productsController.create);

export default routes;
