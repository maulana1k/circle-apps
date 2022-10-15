import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const hasToken = authorization && authorization.split(' ')[0] == 'Bearer';
  if (!hasToken) {
    return res.status(403).json('Authorization token required');
  }
  jwt.verify(
    authorization.split(' ')[1],
    process.env['JWT_KEY'],
    { complete: true },
    (err, decoded) => {
      if (err) return res.status(401).json('Authorization token invalid');
      req.body['user'] = decoded;
      next();
    }
  );
}
