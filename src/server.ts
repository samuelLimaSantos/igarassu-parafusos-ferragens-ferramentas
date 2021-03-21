import './database';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'reflect-metadata';
import routes from './routes';
import { AppError } from './shared/errors/AppError';
import { ErrorsEnum } from './shared/utils/Enums';

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

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running at port ${port} 🚀`);
});
