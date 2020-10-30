import { Router } from 'express';
import CategoryController from '../controllers/CategoriesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

const categoryController = new CategoryController();

routes.use(ensureAuthenticated);

routes.post('/', categoryController.create);
routes.get('/', categoryController.store);

export default routes;
