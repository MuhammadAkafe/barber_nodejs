import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
  jwt.verify(token, process.env.PUBLIC_KEY!, (err) => {
    if (err) {
      res.status(401).json({ message: 'Token expired or invalid' });
      return;
    }

    next(); // Proceed to the next middleware or route handler
  });
};





