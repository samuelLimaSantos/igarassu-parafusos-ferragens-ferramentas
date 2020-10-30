import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

const productsController = new ProductsController();

routes.use(ensureAuthenticated);

routes.post('/', productsController.create);
routes.get('/', productsController.index);
routes.get('/filter', productsController.filtered);
routes.get('/unique/:id', productsController.store);
routes.put('/:id', productsController.update);
routes.delete('/:id', productsController.delete);
routes.get('/report', productsController.report);

export default routes;
