import { Router } from 'express';
import ensureFormatParams from '../modules/users/middlewares/EnsureFormatParams';
import { createSessionController } from '../modules/users/useCases/createSession';

const sessionsRouter = Router();

sessionsRouter.post('/', ensureFormatParams.createSession, async (request, response) => {
  await createSessionController().handle(request, response);
});

export default sessionsRouter;
