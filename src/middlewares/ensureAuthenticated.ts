import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authBearer = request.headers.authorization;

  if (!authBearer) {
    throw new Error('Token JWT is missing');
  }

  const [, token] = authBearer.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
