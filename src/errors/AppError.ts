import { ErrorsEnum } from '../utils/Enums';

class AppError {
  message: string;

  statusCode: number;

  constructor(message: string, statusCode = ErrorsEnum.badRequest) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
