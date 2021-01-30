import { Router } from 'express';
import CreateUser from '../services/CreateUser';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { login, password } = request.body;

    const createUser = new CreateUser();

    await createUser.execute({
      login,
      password,
    });

    return response.status(201).json({ message: 'User created' });
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default usersRouter;
