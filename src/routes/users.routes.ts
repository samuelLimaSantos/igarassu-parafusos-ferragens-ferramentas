import { Router } from 'express';
import CreateUser from '../services/CreateUser';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { login, password } = request.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      login,
      password,
    });

    user.password = '';

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default usersRouter;
