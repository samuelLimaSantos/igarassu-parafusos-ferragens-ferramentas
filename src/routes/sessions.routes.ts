import { Router, Request, Response } from 'express';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { sessionErrors } from '../errors/utils/ErrorsDescriptions';
import ValidateSession from '../services/ValidateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { login, password } = request.body;

  const schema = yup.object().shape({
    login: yup.string().required(sessionErrors.loginRequired),
    password: yup.string().min(6, sessionErrors.passwordMinLength)
      .required(sessionErrors.passwordRequired),
  });

  try {
    await schema.validate(request.body, { abortEarly: false });
  } catch (error) {
    throw new AppError(error.errors);
  }

  const createSession = new ValidateSession();

  const { id, token } = await createSession.execute({
    login,
    password,
  });

  return response.json({ id, token });
});

export default sessionsRouter;
