import { Router } from 'express';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/categories', categoriesRoutes);

export default routes;
