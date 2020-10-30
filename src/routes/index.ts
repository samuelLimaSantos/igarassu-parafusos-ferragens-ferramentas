import { Router } from 'express';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
