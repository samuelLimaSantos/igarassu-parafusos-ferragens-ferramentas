import 'reflect-metadata';
import '../../container';
import express, { Request, Response, NextFunction } from 'express';
import '../../../database';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { AppError } from '../../errors/AppError';
import { ErrorsEnum } from '../../utils/Enums';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(ErrorsEnum.InternalServerError).json({
    message: `Internal server error ${error}`,
  });
});

export { app };
