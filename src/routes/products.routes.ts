import { Router } from 'express';
import multer from 'multer';
import ProductsController from '../controllers/ProductsController';
import ImportController from '../controllers/ImportController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const routes = Router();

const upload = multer(uploadConfig);
const productsController = new ProductsController();
const importController = new ImportController();

routes.use(ensureAuthenticated);

routes.post('/', productsController.create);
routes.get('/', productsController.index);
routes.get('/filter', productsController.filtered);
routes.get('/unique/:id', productsController.store);
routes.put('/:id', productsController.update);
routes.delete('/:id', productsController.delete);

routes.post('/import', upload.single('file'), importController.create);

export default routes;
