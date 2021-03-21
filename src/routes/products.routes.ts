import { Router } from 'express';
import multer from 'multer';
import ImportController from '../controllers/ImportController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ensureFormatParams from '../modules/products/middlewares/EnsureFormatParams';
import { listProductsController } from '../modules/products/useCases/listProducts';
import { listOneProductController } from '../modules/products/useCases/listOneProduct';
import { deleteProductController } from '../modules/products/useCases/deleteProduct';
import { updateInventoryController } from '../modules/products/useCases/updateInvetory';
import { updateProductController } from '../modules/products/useCases/updateProduct';
import { createProductController } from '../modules/products/useCases/createProduct';

const routes = Router();

const upload = multer(uploadConfig);

routes.use(ensureAuthenticated);

routes.post('/', ensureFormatParams.createProduct, async (request, response) => {
  await createProductController().handle(request, response);
});

routes.get('/', ensureFormatParams.listProducts, async (request, response) => {
  await listProductsController().handle(request, response);
});

routes.get('/:id', ensureFormatParams.listOneProduct, async (request, response) => {
  await listOneProductController().handle(request, response);
});

routes.put('/:id', ensureFormatParams.updateProduct, async (request, response) => {
  await updateProductController().handle(request, response);
});

routes.put('/inventory/:product_id', ensureFormatParams.updateInventory, async (request, response) => {
  await updateInventoryController().handle(request, response);
});

routes.delete('/:id', ensureFormatParams.deleteProduct, async (request, response) => {
  await deleteProductController().handle(request, response);
});

// routes.post('/import', upload.single('file'), importController.create);

export default routes;
