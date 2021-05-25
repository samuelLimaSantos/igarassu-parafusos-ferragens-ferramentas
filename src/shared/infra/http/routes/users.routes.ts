import { Router } from 'express';
import ensureFormatParams from '../../../../modules/users/middlewares/EnsureFormatParams';
import { CreateUserController } from '../../../../modules/users/useCases/createUser/CreateUserController';

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.post('/', ensureFormatParams.createUser, createUserController.handle);

export default usersRouter;
