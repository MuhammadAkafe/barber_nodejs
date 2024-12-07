import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction, } from 'express';


export const authenticateToken = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({message:'Unauthorized'});
    }
    try {
      const token = authHeader.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.PUBLIC_KEY!);  
      next();
    } 
    catch (err) 
    {
      return res.status(401).json({message:'Unauthorized'});
    }
  };
