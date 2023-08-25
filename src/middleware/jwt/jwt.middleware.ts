import { Request, Response, NextFunction } from 'express';

export function jwt(req: Request, res: Response, next: NextFunction) {
  next();
}
