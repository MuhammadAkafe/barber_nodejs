import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import hashing from '../controller/UserService/hashing';

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Record<string,any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'UnAuthorized' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.PUBLIC_KEY!, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }
    next();
  });
};

// Route handler to refresh the token
export const RefreshToken = (req: Request, res: Response): Response => {
  const refreshToken = req.cookies?.refresh_token; // Ensure cookies are present
  if (!refreshToken) {
    return res.status(401).send({ message: 'Invalid refresh token' });
  }

  const Hashing = new hashing();
  try {
    // Verify the refresh token
    const decodedUser = jwt.verify(refreshToken, process.env.PRIVATE_KEY!) as JwtPayload;

    // Generate a new access token
    const newAccessToken = Hashing.generateAccessToken(decodedUser.id); // Assuming `generateAccessToken` expects user ID
    return res.json({ accessToken: newAccessToken }); // Send the new access token to the client
  } 
  catch (err) {
    console.error('Refresh token error:', err);
    return res.status(403).send({ message: 'Invalid refresh token' });
  }
};
