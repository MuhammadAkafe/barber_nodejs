import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

// Config
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const PUBLIC_KEY: string = process.env.PUBLIC_KEY || '';

const accessTokenOptions: SignOptions = { algorithm: "RS256", expiresIn: "15m" };
const refreshTokenOptions: SignOptions = { algorithm: "RS256", expiresIn: "7d" };

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not found in header' });
    }

    if (!PUBLIC_KEY) {
      console.error('PUBLIC_KEY is missing in environment variables');
      return res.status(500).json({ message: 'Server configuration error: Missing PUBLIC_KEY' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Optionally attach decoded payload to request
    // req.user = decoded;

    return next();
  } catch (error: any) {
    console.error('Error in authenticateToken middleware:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Generate Access Token
export const generateAccessToken = (payload: Record<string, any> | undefined): string | null => {
  try {
    if (!payload) return null;
    if (!PRIVATE_KEY) {
      console.error('PRIVATE_KEY is missing in environment variables');
      return null;
    }
    return jwt.sign(payload, PRIVATE_KEY, accessTokenOptions);
  } catch (error) {
    console.error("Error generating access token:", error);
    return null;
  }
};

// Generate Refresh Token
export const generateRefreshToken = (payload: Record<string, any> | undefined): string | null => {
  try {
    if (!payload) return null;
    if (!PRIVATE_KEY) {
      console.error('PRIVATE_KEY is missing in environment variables');
      return null;
    }
    return jwt.sign(payload, PRIVATE_KEY, refreshTokenOptions);
  } 
  catch (error: any) {
    console.error("Error generating refresh token:", error.message);
    return null;
  }
};

// Verify Token
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }) as JwtPayload;
  } catch (error: any) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};
