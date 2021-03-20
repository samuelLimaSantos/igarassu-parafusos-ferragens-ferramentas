import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'reflect-metadata';
import './database';
import routes from './routes';
import { AppError } from './errors/AppError';
import { ErrorsEnum } from './utils/Enums';

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

app.listen(3333, () => {
  console.log('Server is running at port 3333 🚀');
});
