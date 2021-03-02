import { Router } from 'express';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { usersErrors } from '../errors/utils/ErrorsDescriptions';
import CreateUser from '../services/CreateUser';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { login, password } = request.body;

  const schema = yup.object().shape({
    login: yup.string().required(usersErrors.loginRequired),
    password: yup.string().min(6, usersErrors.passwordMinLength)
      .required(usersErrors.passwordRequired),
  });

  try {
    await schema.validate(request.body, { abortEarly: false });
  } catch (error) {
    throw new AppError(error.errors);
  }

  const createUser = new CreateUser();

  await createUser.execute({
    login,
    password,
  });

  return response.status(201).json({ message: 'User created' });
});

export default usersRouter;
