import { Router } from 'express';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';
import transactionsRoutes from './transactions.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;
