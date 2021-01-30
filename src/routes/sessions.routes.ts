import { Router, Request, Response } from 'express';
import ValidateSession from '../services/ValidateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { login, password } = request.body;

    const createSession = new ValidateSession();

    const { id, token } = await createSession.execute({
      login,
      password,
    });

    return response.json({ id, token });
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default sessionsRouter;
