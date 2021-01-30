import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();
const transactionsController = new TransactionsController();

routes.use(ensureAuthenticated);

routes.get('/:product_id', transactionsController.index);

export default routes;
