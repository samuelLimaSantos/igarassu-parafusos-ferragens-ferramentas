import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ensureFormatParams from '../../../../modules/transactions/middlewares/EnsureFormatParams';
import { ListTransactionsController } from '../../../../modules/transactions/useCases/listTransactions/ListTransactionsController';

const routes = Router();
const listTransactionsController = new ListTransactionsController();

routes.use(ensureAuthenticated);

routes.get('/:product_id', ensureFormatParams.listTransaction, listTransactionsController.handle);

export default routes;
