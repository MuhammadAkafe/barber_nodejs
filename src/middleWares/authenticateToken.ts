import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import hashing from '../controller/UserService/hashing';

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
):  void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
     res.status(401).json({ message: 'Unauthorized' });
     return
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.PUBLIC_KEY!, (err) => {
    if (err) {
       res.status(401).json({ message: 'Token expired or invalid' });
       return
    }
    next();
  });
};

// Route handler to refresh the token
export const RefreshToken = (req: Request, res: Response): Response => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const hashingInstance = new hashing();

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.PRIVATE_KEY!) as JwtPayload;

    // Generate a new access token
    const newAccessToken = hashingInstance.generateAccessToken(decoded.id);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Error verifying refresh token:', err);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
