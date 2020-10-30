import { Router, Request, Response } from 'express';
import ValidateSession from '../services/ValidateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { login, password } = request.body;

    const createSession = new ValidateSession();

    const { user, token } = await createSession.execute({
      login,
      password,
    });

    user.password = '';

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default sessionsRouter;
