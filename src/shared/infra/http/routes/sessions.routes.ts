import { Router } from 'express';
import ensureFormatParams from '../../../../modules/users/middlewares/EnsureFormatParams';
import { CreateSessionController } from '../../../../modules/users/useCases/createSession/CreateSessionController';

const sessionsRouter = Router();
const createSessionController = new CreateSessionController();

sessionsRouter.post('/', ensureFormatParams.createSession, createSessionController.handle);

export default sessionsRouter;
