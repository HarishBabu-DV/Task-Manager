import type { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) return next();
  return res.status(401).json({ message: 'Not authenticated' });
};
