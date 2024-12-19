import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import hashing from '../controller/UserService/hashing';

// Middleware to authenticate the token
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'UnAuthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    await jwt.verify(token, process.env.PUBLIC_KEY!,(err)=>{
      if(err){
        return res.status(401).json({ message: 'token expired' });
      }
    });  
    next();
  } 
  catch (err) 
  {
    return res.status(401).json({ message: 'UnAuthorized' });
  }
};

// Route handler to refresh the token

export const RefreshToken = (req: Request, res: Response): Response  => {
  const refreshToken = req.cookies?.refresh_token; // Ensure cookies are present
  if (!refreshToken) 
    {
    return res.status(401).send({ message: 'Invalid refresh token' ,refreshToken:`${refreshToken}`});
  }
  const  Hashing=new hashing()
  try {
    // Verify the refresh token
    const user = jwt.verify(refreshToken, process.env.PRIVATE_KEY!) as jwt.JwtPayload;

    // Generate a new access token
    const newAccessToken = Hashing.generateAccessToken(user)
    return res.json({ accessToken: user });
  } catch (err) {
    return res.status(403).send({ message: 'Invalid refresh token' });
  }
};

