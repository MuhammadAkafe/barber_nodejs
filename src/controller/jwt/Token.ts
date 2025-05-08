import { Request, Response, NextFunction } from 'express';
import tokenHandler from './jwtTokenHandler';

export const authenticateToken = (req: Request, res: Response, next: NextFunction):void => {
  try {
    // التحقق من وجود الهيدر Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) 
      {
       res.status(401).json({ message: 'Unauthorized: Missing Authorization header' });
       return
    }

    // استخراج التوكن من الهيدر
    const token = authHeader.split(' ')[1];
    if (!token) {
       res.status(401).json({ message: 'Unauthorized: Token not found in header' });
       return
    }

    // التأكد من وجود المفتاح العام
    const Public_key = process.env.PUBLIC_KEY;
    if (!Public_key) {
      console.error('PUBLIC_KEY is missing in environment variables');
       res.status(500).json({ message: 'Server configuration error: Missing PUBLIC_KEY' });
       return
    }

    const TokenHandler = new tokenHandler();
    const decoded = TokenHandler.verifyToken(token);

    if (!decoded) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return
    }
    
     next();
  } 
  
  catch (error: any) 
  {
    console.error('Error in authenticateToken middleware:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
