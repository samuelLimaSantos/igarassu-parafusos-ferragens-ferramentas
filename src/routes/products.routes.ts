import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const routes = Router();

const productsController = new ProductsController();

routes.post('/', productsController.create);
routes.get('/', productsController.index);
routes.get('/filter', productsController.filtered);
routes.get('/unique/:id', productsController.store);

export default routes;
