import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ensureFormatParams from '../../../../modules/categories/middlewares/EnsureFormatParams';
import { CreateCategoryController } from '../../../../modules/categories/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/categories/useCases/listCategories/ListCategoriesController';

const routes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

routes.use(ensureAuthenticated);

routes.post('/', ensureFormatParams.createCategory, createCategoryController.handle);

routes.get('/', listCategoriesController.handle);

export default routes;
