import { Router } from 'express';
import multer from 'multer';
import ProductsController from '../controllers/ProductsController';
import ImportController from '../controllers/ImportController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ensureFormatParams from '../modules/products/middlewares/EnsureFormatParams';
import { listProductsController } from '../modules/products/useCases/listProducts';

const routes = Router();

const upload = multer(uploadConfig);
const productsController = new ProductsController();
const importController = new ImportController();

routes.use(ensureAuthenticated);

routes.post('/', productsController.create);
routes.get('/', ensureFormatParams.listProducts, async (request, response) => {
  await listProductsController().handle(request, response);
});
routes.get('/filter', productsController.filtered);
routes.get('/unique/:id', productsController.store);
routes.put('/:id', productsController.update);
routes.put('/inventory/:product_id', productsController.updateInventoryControl);
routes.delete('/:id', productsController.delete);

routes.post('/import', upload.single('file'), importController.create);

export default routes;
