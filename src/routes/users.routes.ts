import { Router } from 'express';
import ensureFormatParams from '../modules/users/middlewares/EnsureFormatParams';
import { createUserController } from '../modules/users/useCases/createUser';

const usersRouter = Router();

usersRouter.post('/', ensureFormatParams.createUser, async (request, response) => {
  await createUserController().handle(request, response);
});

export default usersRouter;
