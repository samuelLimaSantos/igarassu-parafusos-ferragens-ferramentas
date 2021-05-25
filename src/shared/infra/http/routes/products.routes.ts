import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ensureFormatParams from '../../../../modules/products/middlewares/EnsureFormatParams';
import { CreateProductController } from '../../../../modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '../../../../modules/products/useCases/deleteProduct/DeleteProductController';
import { ListProductsController } from '../../../../modules/products/useCases/listProducts/ListProductsController';
import { ImportProductsController } from '../../../../modules/products/useCases/importProducts/ImportProductsController';
import { ListOneProductController } from '../../../../modules/products/useCases/listOneProduct/ListOneProductController';
import { UpdateInventoryController } from '../../../../modules/products/useCases/updateInvetory/UpdateInventoryController';
import { UpdateProductController } from '../../../../modules/products/useCases/updateProduct/UpdateProductController';

const routes = Router();
const createProductController = new CreateProductController();
const deleteProductController = new DeleteProductController();
const listProductsController = new ListProductsController();
const importProductsController = new ImportProductsController();
const listOneProductController = new ListOneProductController();
const updateInventoryController = new UpdateInventoryController();
const updateProductController = new UpdateProductController();

const upload = multer({
  dest: './tmp',
});

routes.use(ensureAuthenticated);

routes.post('/', ensureFormatParams.createProduct, createProductController.handle);

routes.post('/import', upload.single('products'), importProductsController.handle);

routes.get('/', ensureFormatParams.listProducts, listProductsController.handle);

routes.get('/:id', ensureFormatParams.listOneProduct, listOneProductController.handle);

routes.put('/:id', ensureFormatParams.updateProduct, updateProductController.handle);

routes.put('/inventory/:product_id', ensureFormatParams.updateInventory, updateInventoryController.handle);

routes.delete('/:id', ensureFormatParams.deleteProduct, deleteProductController.handle);

export default routes;
