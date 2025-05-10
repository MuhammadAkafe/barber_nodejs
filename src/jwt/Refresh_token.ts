import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { verifyToken, generateAccessToken } from './Token';

dotenv.config();

const PUBLIC_KEY = process.env.PUBLIC_KEY;

export const RefreshToken = (req: Request, res: Response): Response => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }

    if (!PUBLIC_KEY) {
      return res.status(500).json({ message: 'Server error: PUBLIC_KEY is missing' });
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded || typeof decoded !== 'object' || !decoded.id) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessToken({ id: decoded.id });

    if (!newAccessToken) {
      return res.status(500).json({ message: 'Failed to generate new access token' });
    }

    return res.json({ accessToken: newAccessToken });
  } 
  catch (err: any) {
    // Check error type by name since jwt errors don't work with instanceof when jwt is default-imported
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token has expired' });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    return res.status(500).json({ message: 'An error occurred while processing the refresh token' });
  }
};
