import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { createCategoryController } from '../modules/categories/useCases/createCategory';
import { listCategoriesController } from '../modules/categories/useCases/listCategories';
import ensureFormatParams from '../modules/categories/middlewares/EnsureFormatParams';

const routes = Router();

routes.use(ensureAuthenticated);

routes.post('/', ensureFormatParams.createCategory, async (request, response) => {
  await createCategoryController().handle(request, response);
});

routes.get('/', async (request, response) => {
  await listCategoriesController().handle(request, response);
});

export default routes;
