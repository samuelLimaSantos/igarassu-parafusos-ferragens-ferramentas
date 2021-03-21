import { Router } from 'express';
import ensureAuthenticated from '../shared/middlewares/ensureAuthenticated';
import ensureFormatParams from '../modules/transactions/middlewares/EnsureFormatParams';
import { listTransactionsController } from '../modules/transactions/useCases/listTransactions';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/:product_id', ensureFormatParams.listTransaction, async (request, response) => {
  await listTransactionsController().handle(request, response);
});

export default routes;
